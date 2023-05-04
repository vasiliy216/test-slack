import { io } from "socket.io-client"

const socket = io(process.env.NEXTAUTH_URL as string, {
	path: "/api/socket",
	transports: ["websocket"],
	reconnectionAttempts: 13,
	withCredentials: true
})

socket.on("connect", () => console.log("\x1b[32mConnection to socket\x1b[0m"))
socket.on("disconnect", () => console.log("\x1b[31mDisconnect from socket\x1b[0m"))

socket.on("connect_error", () => {
	socket.io.opts.transports = ["polling", "websocket"]
})

export { socket }