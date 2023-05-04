// import { DefaultEventsMap } from "@socket.io/component-emitter"
// import { io, Socket } from "socket.io-client"
// import { socket } from "utils/socket-io"

// let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null

// export const getSocket = () => {
// 	if (!socket) { socket = io(process.env.NEXTAUTH_URL as string, { path: "/api/socket" }) }
// 	// if (!socket) { socket = io() }
// 	return socket
// }

// export const getSocket = () => socket