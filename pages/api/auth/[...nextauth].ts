import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { getUser, createUser } from "api/user"
import { getCircle, createCircle } from "api/circle"
import { generatorPasswordHash } from "utils/generator-password-hash"
import { sendVerificationToken } from "utils/send-verification-token"
import { getUniqueId } from "utils/get-unique-id"

let _req: NextApiRequest

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "login",
			type: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}
				const [user] = await getUser({ email }, _req)

				if (!user) { throw new Error("User not found.") }

				if (!bcrypt.compareSync(password, user.password)) { throw new Error("Invalid email or password.") }

				if (!user.emailVerified) { throw new Error("The email is not verified.") }

				return user
			}
		}),
		CredentialsProvider({
			id: "create",
			type: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password, spaceName, passCode } = credentials as {
					email: string
					password: string
					spaceName: string
					passCode: string
				}

				const values = await Promise.all([getCircle(spaceName, _req), getUser({ email }, _req)])
				const [circleExist] = values[0]
				const [user] = values[1]

				if (circleExist) { throw new Error("A space with this name exists.") }

				if (user) { throw new Error("A user with such an email exists.") }

				const newUser = {
					...credentials,
					circleId: spaceName,
					id: getUniqueId(),
					password: await generatorPasswordHash(password)
				}

				await createCircle({ id: spaceName, passCode: passCode }, _req)

				const res = await createUser(newUser, _req)

				if (!res) { throw new Error("Something was wrong. Please try again later.") }

				await sendVerificationToken({ email, id: newUser.id, req: _req })

				throw new Error("The letter was sent to the post office.")
			}
		}),
		CredentialsProvider({
			id: "join",
			type: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password, spaceName, passCode } = credentials as {
					email: string
					password: string
					spaceName: string
					passCode: string
				}

				const values = await Promise.all([getCircle(spaceName, _req), getUser({ email }, _req)])
				const [circleExist] = values[0]
				const [user] = values[1]

				if (!circleExist) {
					throw new Error("Incorrect Space Name. Please try again")
				} else if (circleExist.passCode !== passCode) {
					throw new Error("Incorrect Passcode. Please try again")
				}

				if (user) { throw new Error("A user with such an email exists.") }

				const newUser = {
					...credentials,
					circleId: spaceName,
					id: getUniqueId(),
					password: await generatorPasswordHash(password)
				}

				const res = await createUser(newUser, _req)

				if (!res) { throw new Error("Something was wrong. Please try again later.") }

				await sendVerificationToken({ email, id: newUser.id, req: _req })

				throw new Error("The letter was sent to the post office.")
			}
		})
	],
	pages: {
		signIn: "/login",
		error: "/error"
	},
	jwt: {},
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
		updateAge: 60 * 60
	},
	callbacks: {
		async session(props) {
			return props.session
		}
	},
	secret: process.env.NEXT_AUTH_SECRET
}

// function setNextAuthUrl(req: NextApiRequest) {
// 	const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
// 	const host = req.headers["host"]

// 	if (!host) {
// 		throw new Error("The request has no host header which breaks authentication and authorization.")
// 	}

// 	if (protocol === "https") { return }

// 	process.env.NEXTAUTH_URL = `${protocol}://${host}`
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// setNextAuthUrl(req)
	if (!_req) { _req = req }
	return NextAuth(req, res, authOptions)
}