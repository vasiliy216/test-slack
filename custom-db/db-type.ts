/* eslint-disable @typescript-eslint/no-explicit-any */
export type DBUserType = {
	_id?: string
	id?: string
	avatar?: string
	username?: string
	firstName?: string
	lastName?: string
	email?: string
	password?: string
}

export type DBCircleType = {
	_id?: string
	name?: string // id
	userIds?: string[]
	passCode?: string
	channelIds?: string[]
	albumIds?: string
}

export type DBAlbumType = {
	_id?: string
	id?: string
	name?: string
	photos?: string[]
}

export type DBChannelType = {
	_id?: string
	id?: string
	name?: string
	messageIds?: string[]
}

export type DBMessageType = {
	_id?: string
	id?: string
	userId?: string
	text?: string
	date?: string
}

export type DBModalType = {
	user: DBUserType[]
	circle: DBCircleType[]
	album: DBAlbumType[]
	channel: DBChannelType[]
	message: DBMessageType[]
}

export type ModalType = "user" | "circle" | "album" | "channel" | "message"

export type ObjType = DBUserType | DBCircleType | DBAlbumType | DBChannelType | DBMessageType

export type FilterQuery = {
	[P in any]?: any
}