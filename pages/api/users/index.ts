
import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap } from "utils/api-call-wrap"
import { deletePhotoFromS3, savePhotoToS3 } from "utils/s3-images"
import { createUser, deleteUserById, updateUserById, getUser, getCircleUsers, updateUserAvatar } from "utils/sql-handlers"

export default async function users(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req

	switch (method) {
		case "GET":
			if (query.circleId) {
				await apiCallWrap(req, res, getCircleUsers(query.circleId as string))
			} else {
				await apiCallWrap(req, res, getUser(query))
			}
			break
		case "POST":
			await apiCallWrap(req, res, createUser(body.user))
			break
		case "PUT":
			if (body.action === "updateAvatar") {
				const { file, fileName, userId, previewAvatar, circleId } = body
				let link = ""
				await deletePhotoFromS3(previewAvatar)

				if (file && fileName) {
					link = await savePhotoToS3(file, fileName, circleId)
				}

				await apiCallWrap(req, res, updateUserAvatar(userId, link))
			} else {
				await apiCallWrap(req, res, updateUserById(body.user))
			}
			break
		case "DELETE":
			await apiCallWrap(req, res, deleteUserById(body.id))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}