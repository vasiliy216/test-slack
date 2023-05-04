import * as nodemailer from "nodemailer"

type SendMailType = {
	email: string | undefined
	url?: string
	// textType: "welcome" | "reset-password" | "verification"
	textType:  "reset-password" | "verification"
}

type MessageControllerType = {
	url?: string
	email?: string
}

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD
	}
})

// const textWelcome = (props: MessageControllerType) => (
// 	`
// 	<div id="style_16739718261919777600_BODY" style="border-color: rgb(35, 35, 35) !important;">Hi! Thanks for signing up!<br style="border-color: rgb(35, 35, 35) !important;">
// 	<br style="border-color: rgb(35, 35, 35) !important;">
// 	We just need to verify your email address before you can access our portal. Click here <a href="${props.url}" target="_blank" style="border-color: rgb(35, 35, 35) !important;">${props.url}</a>to open the landing page. <br style="border-color: rgb(35, 35, 35) !important;">
// 	<br style="border-color: rgb(35, 35, 35) !important;">
// 	We’re glad you’re here!<br style="border-color: rgb(35, 35, 35) !important;">
// 	Kind Regards!<br style="border-color: rgb(35, 35, 35) !important;">
// 	</div>
// 	`
// )

const textResetPassword = (props: MessageControllerType) => (
	`
		<div id="style_16739719420463908855_BODY" style="border-color: rgb(35, 35, 35) !important;">Hi ${props.email},<br style="border-color: rgb(35, 35, 35) !important;">
		<br style="border-color: rgb(35, 35, 35) !important;">
		Someone has requested a password reset, click the link below to create a new password:<br style="border-color: rgb(35, 35, 35) !important;">
		<br style="border-color: rgb(35, 35, 35) !important;">
		<a href="${props.url}" target="_blank" style="border-color: rgb(35, 35, 35) !important;">${props.url}</a><br style="border-color: rgb(35, 35, 35) !important;">
		<br style="border-color: rgb(35, 35, 35) !important;">
		If you did not request a password reset, please ignore this e-mail. Your password<br style="border-color: rgb(35, 35, 35) !important;">
		will not change unless you access the link above and create a new password.<br style="border-color: rgb(35, 35, 35) !important;">
		<br style="border-color: rgb(35, 35, 35) !important;">
		Thanks<br style="border-color: rgb(35, 35, 35) !important;">
		</div>
	`
)

const textVerification = (props: MessageControllerType) => (
	`
	<div id="style_16739718261919777600_BODY" style="border-color: rgb(35, 35, 35) !important;">Hi! <br style="border-color: rgb(35, 35, 35) !important;">
	<br style="border-color: rgb(35, 35, 35) !important;">
	We just need to verify your email address. <a href="${props.url}" target="_blank" style="border-color: rgb(35, 35, 35) !important;">Click here.</a><br style="border-color: rgb(35, 35, 35) !important;">
	<br style="border-color: rgb(35, 35, 35) !important;">
	Kind Regards!<br style="border-color: rgb(35, 35, 35) !important;">
	</div>
	`
)

const messageController = {
	// "welcome": { subject: "Welcome!", html: (props: MessageControllerType) => textWelcome(props) },
	"reset-password": { subject: "Password reset ", html: (props: MessageControllerType) => textResetPassword(props) },
	"verification": { subject: "Mail Verification", html: (props: MessageControllerType) => textVerification(props) }
}

export const sendMail = async ({ email, textType, url }: SendMailType) => {
	try {
		const { subject, html } = messageController[textType]
		const response = await transporter.sendMail({
			from: process.env.EMAIL_SERVER_USER,
			to: email,
			subject,
			html: html({ url, email })
		})
		if (response?.messageId) { return { statusCode: 200 } }
		return { statusCode: 500, errorMessage: "Failed to send email" }

	} catch (error) {
		return { statusCode: 500, errorMessage: "Incorrect mail", error }
	}
}