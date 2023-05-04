
import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap} from "utils/api-call-wrap"
import { createMessage, deleteMessageById, getAllMessages, getMessagesByChannelId, updateMessageById } from "utils/sql-handlers"

export default async function messages(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req

	switch (method) {
		case "GET":
			if(query.id){
				await apiCallWrap(req, res, getMessagesByChannelId(query.id as string))
			}else{
				await apiCallWrap(req, res, getAllMessages())
			}
			break
		case "POST":
			await apiCallWrap(req, res, createMessage(body.message))
			break
		case "PUT":
			await apiCallWrap(req, res, updateMessageById(body.message))
			break
		case "DELETE":
			await apiCallWrap(req, res, deleteMessageById(body.id))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}