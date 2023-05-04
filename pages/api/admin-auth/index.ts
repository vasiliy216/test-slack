import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

const { ADMIN_PASS_HASH } = process.env as unknown as { ADMIN_PASS_HASH: string }

export default async function users(req: NextApiRequest, res: NextApiResponse) {
	const pass = `$2a$10$IieBQYzaBdgFFGR.${ADMIN_PASS_HASH}`
	if (!bcrypt.compareSync(req.body.password, pass)) { return res.status(400).json({ message: "Invalid password." }) }
	return res.status(200).json({ statusCode: 200 })
}