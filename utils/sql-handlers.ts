import { getParams } from "utils/get-params"
import { User, Circle, Album, Channel, Message, Token, TransformationType } from "types"

const _q = (v?: string | null) => v ? `'${v}'` : "\"\""

export function getCircleUsers(circleId: string) {
	const sql = `SELECT * FROM Users WHERE circleId = '${circleId}'`
	return sql
}

export function getUserById(id: string) {
	const sql = `SELECT * FROM Users WHERE id = '${id}'`
	return `${sql}`
}

// get all users or get user by fields
export function getUser(user?: TransformationType<User>) {
	const params = getParams(user as User, "sql", "AND")
	const query = params ? `WHERE ${params}` : ""

	const sql = `SELECT * FROM Users ${query}`
	return `${sql}`
}

export function createUser(user: User) {
	const { id, circleId, avatar, username, firstName, lastName, email, password, emailVerified } = user
	const sql = `INSERT INTO Users (id, circleId, avatar, username, firstName, lastName, email, password, emailVerified) VALUES (${_q(id)}, ${_q(circleId)}, ${_q(avatar)}, ${_q(username)}, ${_q(firstName)}, ${_q(lastName)}, ${_q(email)}, ${_q(password)}, ${_q(emailVerified)})`
	return `${sql}`
}

export function updateUserAvatar(userId: string, avatar: string) {
	const sql = `UPDATE Users SET avatar = '${avatar}' WHERE id = '${userId}'`
	return `${sql}`
}
export function updateUserById(user: TransformationType<User> & { id: string }) {
	const params = getParams(user as User, "sql", "SET")
	const sql = `UPDATE Users SET ${params} WHERE id = '${user.id}'`
	return `${sql}`
}

export function deleteUserById(id: string) {
	const sql = `DELETE FROM Users WHERE id = '${id}'`
	return `${sql}`
}

export function createToken(data: Token) {
	const sql = `INSERT INTO Tokens (id, token) VALUES ('${data.id}', '${data.token}')`
	return `${sql}`
}

export function getToken(id: string) {
	const sql = `SELECT * FROM Tokens WHERE id = '${id}'`
	return `${sql}`
}

export function deleteToken(id: string) {
	const sql = `DELETE FROM Tokens WHERE id = '${id}'`
	return `${sql}`
}

export function getAllCircles() {
	const sql = "SELECT * FROM Circles"
	return sql
}

export function getCircleById(id: string) {
	const sql = `SELECT * FROM Circles WHERE id = '${id}'`
	return `${sql}`
}

export function createCircle(circle: Circle) {
	const { id, passCode } = circle
	const sql = `INSERT INTO Circles (id, passCode) VALUES ('${id}', '${passCode}')`
	return `${sql}`
}

export function updateCircleById(id: string, circle: Circle) {
	const { passCode } = circle
	const sql = `UPDATE Circles SET passCode = '${passCode}' WHERE id = '${id}'`
	return `${sql}`
}

export function deleteCircleById(id: string) {
	const sql = `DELETE FROM Circles WHERE id = '${id}'`
	return `${sql}`
}

export function getCircleAlbums(circleId: string) {
	const sql = `SELECT * FROM Albums WHERE circleId = '${circleId}'`
	return `${sql}`
}

export function getAlbumById(id: string) {
	const sql = `SELECT * FROM Albums WHERE id = '${id}'`
	return `${sql}`
}

export function createAlbum(album: Album) {
	const { id, circleId, name, userId } = album
	const sql = `INSERT INTO Albums (id, circleId, name, photos, userId) VALUES ('${id}', '${circleId}', '${name}', '[]','${userId}')`
	return `${sql}`
}

export function updateAlbumById(id: string, album: Album) {
	const { circleId, name, photos } = album
	const sql = `UPDATE Albums SET circleId = '${circleId}', name = '${name}', photos = '${photos}' WHERE id = '${id}'`
	return `${sql}`
}

export function renameAlbumById(id: string, name: string) {
	const sql = `UPDATE Albums SET name = '${name}' WHERE id = '${id}'`
	return `${sql}`
}
export function selectFoto(id: string, name: string) {
	const sql = `SELECT * FROM  Albums j WHERE id = '${id}'`
	return `${sql}`
}
export function addFoto(id: string, name: string) {
	const sql = `UPDATE Albums j SET j.albums = '${id}'`
	return `${sql}`
}

export function deletePhotoFromAlbum(id: string, photoUrl: string, position: string) {
	const sql = `UPDATE Albums SET photos = JSON_REMOVE(photos, '$[${position}]') WHERE JSON_EXTRACT(photos, '$[${position}]') = '${photoUrl}' AND id = '${id}';`
	return `${sql}`
}

export function addPhotoToAlbum(id: string, photoUrl: string) {
	const sql = `UPDATE Albums SET photos = JSON_ARRAY_APPEND(photos, '$', '${photoUrl}') WHERE id = '${id}'`
	return `${sql}`
}


export function deleteAlbumById(id: string) {
	const sql = `DELETE FROM Albums WHERE id = '${id}'`
	return `${sql}`
}

export function getCircleChannels(circleId: string) {
	const sql = `SELECT * FROM Channels WHERE circleId = '${circleId}'  ORDER BY name ASC`
	return `${sql}`
}

export function getChannelById(id: string) {
	const sql = `SELECT * FROM Channels WHERE id = '${id}'`
	return `${sql}`
}

export function createChannel(channel: Channel) {
	const { id, circleId, name } = channel
	const sql = `INSERT INTO Channels (id, circleId, name) VALUES ('${id}', '${circleId}', '${name}')`
	return `${sql}`
}

export function updateChannelById(id: string, channel: Channel) {
	const { circleId, name } = channel
	const sql = `UPDATE Channels SET circleId = '${circleId}', name = '${name}' WHERE id = '${id}'`
	return `${sql}`
}

export function deleteChannelById(id: string) {
	const sql = `DELETE FROM Channels WHERE id = '${id}'`
	return `${sql}`
}

export function getAllMessages() {
	const sql = "SELECT * FROM Messages "
	return `${sql}`
}

export function getMessageById(id: string) {
	const sql = `SELECT * FROM Messages WHERE id = '${id}'`
	return `${sql}`
}

export function getMessagesByChannelId(channelId: string) {
	const sql = `SELECT * FROM Messages WHERE channelId = '${channelId}' ORDER BY date ASC`
	return `${sql}`
}

export function createMessage(message: Message) {
	const { id, channelId, userId, text, date } = message
	const sql = `INSERT INTO Messages (id, channelId, userId, text, date) VALUES ('${id}', '${channelId}', '${userId}', '${text}', '${date}')`
	return `${sql}`
}

export function updateMessageById(message: Message) {
	const { channelId, userId, text, date, id } = message
	const sql = `UPDATE Messages SET channelId = '${channelId}', userId = '${userId}', text = '${text}', date = '${date}' WHERE id = '${id}'`
	return `${sql}`
}

export function deleteMessageById(id: string) {
	console.log("sql handler:", id)
	const sql = `DELETE FROM Messages WHERE id = '${id}'`
	return `${sql}`
}