import { WebSocketServer } from "ws"
import { NextApiRequest } from "next"
// import { Server } from "socket.io"
// import { Server as NetServer } from "http"
import { getUniqueId } from "utils/get-unique-id"
import { NextApiResponseServerIO } from "types"

const clients: any = {}
const webSocketServer = new WebSocketServer()

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
	webSocketServer.on("connection", function (ws) {
		const id = getUniqueId()
		clients[id] = ws
		console.log("new connect " + id)

		ws.on("message", function (message) {
			console.log("get message " + message)

			for (const key in clients) {
				clients[key].send(message)
			}
		})

		setInterval(() => {
			ws.send(getUniqueId())
		}, 2000)

		ws.on("close", function () {
			console.log("close " + id)
			delete clients[id]
		})

	})
	const arr = [process.pid, process.platform, process.ppid, process.cwd(), process.execArgv, process.execPath, process.exitCode, process.memoryUsage, process.release, process.argv0]
	if (process.getegid) { arr.push(process.getegid()) }
	if (process.geteuid) { arr.push(process.geteuid()) }
	if (process.getgid) { arr.push(process.getgid()) }
	if (process.getgroups) { arr.push(`${process.getgroups()}`) }
	if (process.getuid) { arr.push(process.getuid()) }
	res.end(JSON.stringify([...arr]))
}

// export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
// 	if (res.socket.server.io) {
// 		console.log("Already set up")
// 		res.end()
// 		return
// 	}

// 	const httpServer = res.socket.server as unknown as NetServer
// 	const io = new Server(httpServer, {
// 		path: "/api/socket",
// 		cors: {
// 			origin: process.env.NEXTAUTH_URL as string,
// 			methods: ["GET", "POST"],
// 			credentials: true
// 		}
// 	})

// 	io.on("connection", socket => {
// 		socket.on("MSG:HELLO", () => console.log("\x1b[34mHELLO\x1b[0m"))
// 		/* Message handlers */

// 		socket.on("createMessage", async (message: Message) => {
// 			await apiCallSocket(req, res, createMessage({ ...message }))
// 			socket.broadcast.to(message.channelId).emit("updateMessages")
// 		})
// 		socket.on("getMessagesByChannel", async (channelId: string) => {
// 			const result = await apiCallSocket(req, res, getMessagesByChannelId(channelId))
// 			socket.emit("receiveMessagesFromChannel", result)
// 		})
// 		socket.on("joinChannel", async (channelId: string) => {
// 			socket.join(channelId)
// 		})
// 		socket.on("updateMessageById", async (message: Message) => {
// 			await apiCallSocket(req, res, updateMessageById(message))
// 			socket.broadcast.to(message.channelId).emit("updateMessages")
// 		})
// 		socket.on("deleteMessageById", async ({ id, channelId }: Pick<Message, "id" | "channelId">) => {
// 			await apiCallSocket(req, res, deleteMessageById(id))
// 			socket.broadcast.to(channelId).emit("updateMessages")
// 		})

// 		/* Channel handlers */

// 		socket.on("joinCircle", async (circleId: string) => {
// 			console.log("circle:", circleId)

// 			socket.join(circleId)
// 		})
// 		socket.on("deleteChannelById", async ({ id, circleId }: Pick<Channel, "id" | "circleId">) => {
// 			await apiCallSocket(req, res, deleteChannelById(id))
// 			socket.broadcast.to(circleId).emit("updateChannels")
// 		})
// 		socket.on("createChannel", async (channel: Channel) => {
// 			await apiCallSocket(req, res, createChannel({ ...channel }))
// 			socket.broadcast.to(channel.circleId).emit("updateChannels")
// 		})
// 		socket.on("getChannelsByCircle", async (circleId: string) => {
// 			const result = await apiCallSocket(req, res, getCircleChannels(circleId))

// 			socket.emit("receiveChannelsFromCirce", result)
// 		})

// 		/* Album handlers */

// 		socket.on("joinAlbumSpace", async () => {
// 			socket.join("albumSpace")
// 		})
// 		socket.on("leaveCircle", () => {
// 			socket.leave("albumSpace")
// 		})
// 		socket.on("createAlbum", async (album: Album) => {
// 			await apiCallSocket(req, res, createAlbum(album))
// 			socket.broadcast.to("albumSpace").emit("updateAlbums")
// 		})
// 		socket.on("deleteAlbumById", async (id: string) => {
// 			await apiCallSocket(req, res, deleteAlbumById(id))
// 			socket.broadcast.to("albumSpace").emit("updateAlbums")
// 		})
// 		socket.on("getAlbumsByCircleId", async (circleId: string) => {
// 			const result = await apiCallSocket(req, res, getCircleAlbums(circleId))
// 			socket.emit("receiveAlbumsFromCirce", result.map(fixedPhotosType))
// 		})
// 		socket.on("updateCurrentAlbum", async () => {
// 			socket.broadcast.to("albumSpace").emit("updateAlbums")
// 		})
// 	})

// 	console.log("res.socket.server", res.socket.server)
// 	res.socket.server.io = io
// 	console.log("io", io)

// 	console.log("Setting up socket")
// 	res.end()
// }

export const config = {
	api: {
		bodyParser: false
	}
}