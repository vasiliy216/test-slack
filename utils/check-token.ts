import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

export const checkToken = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const userData = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })
		if (userData) { return userData }
		res.redirect(302, "/")
	} catch {
		res.redirect(302, "/")
	}
}