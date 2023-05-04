import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { getUser } from "api/user"
import { checkToken } from "utils/check-token"
import { updateUserById } from "utils/sql-handlers"
import { generatorPasswordHash } from "utils/generator-password-hash"
import { apiCallWrap } from "utils/api-call-wrap"

export default async function password(req: NextApiRequest, res: NextApiResponse) {
	try {
		const userData = await checkToken(req, res) as { email: string }

		if (!userData) { return res.status(401) }
		const [user] = await getUser({ email: userData.email }, req)

		if (!bcrypt.compareSync(req.body.oldPassword, user.password)) { throw new Error("Incorrect password") }
		const newUser = {
			...user,
			password: await generatorPasswordHash(req.body.newPassword)
		}
		await apiCallWrap(req, res, updateUserById(newUser))
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : "Internal server error"
		return res.status(500).json({ statusCode: 500, message: errorMessage })
	}

}