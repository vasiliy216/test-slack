import { Server as NetServer, Socket } from "net"
import { NextApiResponse } from "next"
import { Server as SocketIOServer } from "socket.io"

export type User = {
	id: string
	circleId: string
	avatar: string
	username: string
	firstName: string
	lastName: string
	email: string
	password: string
	emailVerified?: string | null | "null"
}

export type Circle = {
	id: string
	passCode: string
}

export type Album = {
	id: string
	circleId: string
	name: string
	photos: string[]
	userId: string
}

export type Channel = {
	id: string
	circleId: string
	name: string
}

export type Message = {
	channelId: string
	id: string
	userId: string
	text: string
	date: string
}

export type Token = {
	id: string
	token: string
}

export type NextApiResponseServerIO = NextApiResponse & {
	socket: Socket & {
		server: NetServer & {
			io: SocketIOServer
		}
	}
}

export type TransformationType<T> = { [P in keyof T]?: T[P] }