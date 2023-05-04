import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap} from "utils/api-call-wrap"
import { createCircle, deleteCircleById, getAllCircles, getCircleById, updateCircleById } from "utils/sql-handlers"

export default async function channels(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req

	switch (method) {
		case "GET":
			if(query.id){
				await apiCallWrap(req, res, getCircleById(query.id as string))
			}else{
				await apiCallWrap(req, res, getAllCircles())
			}
			break
		case "POST":
			await apiCallWrap(req, res, createCircle(body.circle))
			break
		case "PUT":
			await apiCallWrap(req, res, updateCircleById(body.id,body.circle))
			break
		case "DELETE":
			await apiCallWrap(req, res, deleteCircleById(body.id))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}