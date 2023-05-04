import { NextApiRequest } from "next"
import { getUser, updateUser } from "api/user"
import { deleteToken } from "api/tokens"

export const checkEmail = async (req: NextApiRequest, email?: string) => {
	try {
		if (!email) { return null }
		const [user] = await getUser({ email }, req)
		if (!user) { return null }

		user.emailVerified = new Date()

		const [resToken, resUser] = await Promise.all([
			deleteToken(user.id, req),
			updateUser({ ...user }, req)
		])

		if (resToken && resUser) { return true }
		return null
	} catch {
		return null
	}
}