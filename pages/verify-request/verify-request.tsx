import { Button } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { NextApiRequest } from "next"
import { GetServerSideProps } from "next/types"
import Link from "next/link"
import { checkEmail } from "utils/check-email"
import { verifyJwtToken } from "utils/verify-jwt-token"
import styles from "./verify-request.module.css"

export default function VerifyRequest() {
	return (
		<div className={styles.page}>
			<div className={`${styles.card} ${styles.success}`}>
				<CheckCircleOutlined style={{ fontSize: "42px", color: "var(--green)" }} />
				<h3>Your email has been confirmed</h3>
				<Button type="link"><Link href="/login">Go to Login</Link></Button>
			</div>
		</div>
	)
}

type VerifyJwtTokenType = {
	email?: string
	date?: Date
	iat?: number
	exp?: number
}

export const getServerSideProps: GetServerSideProps = async ({ req, query: { verification_token } }) => {
	try {
		const { email } = await verifyJwtToken(verification_token as string) as VerifyJwtTokenType
		const status = await checkEmail(req as NextApiRequest, email)
		if (status !== null) { return { props: {} } }
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			},
			props: {}
		}
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			},
			props: {}
		}
	}
}
