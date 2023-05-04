import { NextApiRequest } from "next"
import { Server } from "socket.io"
import { Server as NetServer } from "http"
import { apiCallSocket } from "utils/api-call-socket"
import {
	createMessage,
	getMessagesByChannelId,
	updateMessageById,
	deleteMessageById,
	createChannel,
	getCircleChannels,
	deleteChannelById,
	createAlbum,
	deleteAlbumById,
	getCircleAlbums
} from "utils/sql-handlers"
import { Message, Channel, Album, NextApiResponseServerIO } from "types"

const fixedPhotosType = (album: Album) => ({
	...album,
	photos: JSON.parse(album.photos as unknown as string)
})

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
	if (res.socket.server.io) {
		console.log("Already set up")
		res.end()
		return
	}

	const httpServer = res.socket.server as unknown as NetServer
	const io = new Server(httpServer, {
		path: "/api/socket",
		cors: {
			origin: process.env.NEXTAUTH_URL as string,
			methods: ["GET", "POST"],
			credentials: true
		}
	})

	io.on("connection", socket => {
		socket.on("MSG:HELLO", () => console.log("\x1b[34mHELLO\x1b[0m"))
		/* Message handlers */

		socket.on("createMessage", async (message: Message) => {
			await apiCallSocket(req, res, createMessage({ ...message }))
			socket.broadcast.to(message.channelId).emit("updateMessages")
		})
		socket.on("getMessagesByChannel", async (channelId: string) => {
			const result = await apiCallSocket(req, res, getMessagesByChannelId(channelId))
			socket.emit("receiveMessagesFromChannel", result)
		})
		socket.on("joinChannel", async (channelId: string) => {
			socket.join(channelId)
		})
		socket.on("updateMessageById", async (message: Message) => {
			await apiCallSocket(req, res, updateMessageById(message))
			socket.broadcast.to(message.channelId).emit("updateMessages")
		})
		socket.on("deleteMessageById", async ({ id, channelId }: Pick<Message, "id" | "channelId">) => {
			await apiCallSocket(req, res, deleteMessageById(id))
			socket.broadcast.to(channelId).emit("updateMessages")
		})

		/* Channel handlers */

		socket.on("joinCircle", async (circleId: string) => {
			console.log("circle:", circleId)

			socket.join(circleId)
		})
		socket.on("deleteChannelById", async ({ id, circleId }: Pick<Channel, "id" | "circleId">) => {
			await apiCallSocket(req, res, deleteChannelById(id))
			socket.broadcast.to(circleId).emit("updateChannels")
		})
		socket.on("createChannel", async (channel: Channel) => {
			await apiCallSocket(req, res, createChannel({ ...channel }))
			socket.broadcast.to(channel.circleId).emit("updateChannels")
		})
		socket.on("getChannelsByCircle", async (circleId: string) => {
			const result = await apiCallSocket(req, res, getCircleChannels(circleId))

			socket.emit("receiveChannelsFromCirce", result)
		})

		/* Album handlers */

		socket.on("joinAlbumSpace", async () => {
			socket.join("albumSpace")
		})
		socket.on("leaveCircle", () => {
			socket.leave("albumSpace")
		})
		socket.on("createAlbum", async (album: Album) => {
			await apiCallSocket(req, res, createAlbum(album))
			socket.broadcast.to("albumSpace").emit("updateAlbums")
		})
		socket.on("deleteAlbumById", async (id: string) => {
			await apiCallSocket(req, res, deleteAlbumById(id))
			socket.broadcast.to("albumSpace").emit("updateAlbums")
		})
		socket.on("getAlbumsByCircleId", async (circleId: string) => {
			const result = await apiCallSocket(req, res, getCircleAlbums(circleId))
			socket.emit("receiveAlbumsFromCirce", result.map(fixedPhotosType))
		})
		socket.on("updateCurrentAlbum", async () => {
			socket.broadcast.to("albumSpace").emit("updateAlbums")
		})
	})

	console.log("res.socket.server", res.socket.server)
	res.socket.server.io = io
	console.log("io", io)

	console.log("Setting up socket")
	res.end()
}

export const config = {
	api: {
		bodyParser: false
	}
}