import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap } from "utils/api-call-wrap"
import { deletePhotoFromS3, savePhotoToS3 } from "utils/s3-images"
import {
	addPhotoToAlbum, createAlbum, deleteAlbumById, deletePhotoFromAlbum,
	getAlbumById, getCircleAlbums, renameAlbumById, updateAlbumById
} from "utils/sql-handlers"

export default async function albums(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req
	console.log("query", query)
	switch (method) {
		case "GET":
			if (query.id) {
				await apiCallWrap(req, res, getAlbumById(query.id as string))
			} else {
				await apiCallWrap(req, res, getCircleAlbums(query.circleId as string))
			}
			break
		case "POST":
			await apiCallWrap(req, res, createAlbum(body.album))
			break
		case "PUT":
			if (body.action === "rename") {
				await apiCallWrap(req, res, renameAlbumById(body.id, body.name))
			} else if (body.action === "add") {
				const link = await savePhotoToS3(body.file, body.fileName, body.circleId)
				await apiCallWrap(req, res, addPhotoToAlbum(body.albumId, link))
			} else if (body.action === "delete") {
				await deletePhotoFromS3(body.link)
				await apiCallWrap(req, res, deletePhotoFromAlbum(body.albumId, body.link, body.position))
			} else {
				await apiCallWrap(req, res, updateAlbumById(body.id, body.album))
			}
			break
		case "DELETE":
			// eslint-disable-next-line no-case-declarations
			// const photos = await apiCallWrapReturn(req, res, `SELECT photos FROM albums WHERE id = ${body.id}`)
			// await Promise.all(photos.map(deletePhotoFromS3))
			// await apiCallWrap(req, res, `DELETE FROM albums WHERE id = ${body.id}`)
			await apiCallWrap(req, res, deleteAlbumById(body.id))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}