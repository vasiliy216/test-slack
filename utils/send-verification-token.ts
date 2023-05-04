import { NextApiRequest } from "next"
import { createToken } from "api/tokens"
import { createJwtToken } from "utils/create-jwt-token"
import { sendMail } from "utils/send-email"

type SendVerificationTokenPropsType = {
	req: NextApiRequest
	id: string
	email: string
}

export const sendVerificationToken = async (props: SendVerificationTokenPropsType) => {
	try {
		const { email, id, req } = props

		const verificationToken = createJwtToken({ email, date: new Date().toString() })

		const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-request?verification_token=${verificationToken}`

		const resMail = await sendMail({ email, textType: "verification", url: verificationUrl })

		if (resMail.statusCode === 500) { throw new Error("Something was wrong. Please try again later.") }

		await createToken({ id, token: verificationToken }, req)
	} catch (error) {
		console.log(error)
		throw new Error("Something was wrong. Please try again later.")
	}
}