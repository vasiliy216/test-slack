import React, { useState } from "react"
import { Button } from "antd"
import Link from "next/link"
import { checkAdminPass } from "api/admin-auth"
import { Form } from "components/shared/form"
import { showWarningNotification } from "components/shared/notification"
import styles from "pages/login/login.module.css"

type FormButtonType = { loaderBtn?: boolean }
type CreateAuthPropsType = { setIsAuth: (a: boolean) => void }

const FormButton = ({ loaderBtn }: FormButtonType) => (
	<Button size="large" type="primary" htmlType="submit" loading={loaderBtn} block>Submit</Button>
)

export const CreateAuth = (props: CreateAuthPropsType) => {
	const { setIsAuth } = props

	const [password, setPassword] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

	const onSubmit = async () => {
		const res = await checkAdminPass(window.btoa(password))
		if (res.message) { return showWarningNotification(res.message) }
		setIsAuth(true)
	}

	return (
		<section className={styles.auth_section}>
			<div className={`container ${styles.auth_flex}`}>
				<div className={styles.auth_body}>
					<h1 className={styles.auth_title}>Admin</h1>
					<Form
						onSubmit={onSubmit}
						buttons={[<FormButton key="submit" />]}
					>
						<Form.Input
							name="password"
							id="password"
							label="Password"
							type="password"
							placeholder="Enter your password"
							handleChange={handleChange}
							value={password}
							validation={{ required: "This input is required." }}
						/>
					</Form>
					<Link href="/login"><Button type="link">Login</Button></Link>
				</div>
			</div>
		</section>
	)
}