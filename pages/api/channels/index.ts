import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap } from "utils/api-call-wrap"
import { createChannel, deleteChannelById, getCircleChannels, getChannelById, updateChannelById } from "utils/sql-handlers"

export default async function channels(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req

	switch (method) {
		case "GET":
			if (query.id) {
				await apiCallWrap(req, res, getChannelById(query.id as string))
			} else {
				await apiCallWrap(req, res, getCircleChannels(query.circleId as string))
			}
			break
		case "POST":
			await apiCallWrap(req, res, createChannel(body.channel))
			break
		case "PUT":
			await apiCallWrap(req, res, updateChannelById(body.id, body.channel))
			break
		case "DELETE":
			// delete messages from channel 
			await apiCallWrap(req, res, deleteChannelById(body.id))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}