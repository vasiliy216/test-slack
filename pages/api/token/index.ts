
import { NextApiRequest, NextApiResponse } from "next"
import { apiCallWrap } from "utils/api-call-wrap"
import { createToken, deleteToken, getToken } from "utils/sql-handlers"

export default async function token(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, body } = req
	switch (method) {
		case "GET":
			await apiCallWrap(req, res, getToken(query.id as string))
			break
		case "POST":
			await apiCallWrap(req, res, createToken(body.token))
			break
		case "DELETE":
			await apiCallWrap(req, res, deleteToken(body))
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}