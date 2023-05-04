import { useState } from "react"
import { Button } from "antd"
import Router from "next/router"
import { signIn } from "next-auth/react"
import { Form } from "components/shared/form"
import { showWarningNotification } from "components/shared/notification"
import styles from "./login.module.css"
import Link from "next/link"

type FormButtonType = { loaderBtn: boolean }

const FormButton = ({ loaderBtn }: FormButtonType) => (
	<Button size="large" type="primary" htmlType="submit" loading={loaderBtn} block>Log in</Button>
)

export default function Login() {
	const [fields, setFields] = useState({ email: "", password: "" })

	const [loaderBtn, setLoaderBtn] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setFields(prevState => ({ ...prevState, [name]: value }))
	}

	const onSubmit = async () => {
		setLoaderBtn(true)
		const request = { ...fields, password: window.btoa(fields.password) }
		const res = await signIn("login", { ...request, redirect: false })
		setLoaderBtn(false)

		console.log("res", res)
		if (res?.error) { return showWarningNotification(res?.error) }
		return Router.push("/chat")
	}

	return (
		<section className={styles.auth_section}>
			<div className={`container ${styles.auth_flex}`}>
				<div className={styles.auth_body}>
					<h1 className={styles.auth_title}>Sign in</h1>
					<Form
						onSubmit={onSubmit}
						buttons={[<FormButton key="submit" loaderBtn={loaderBtn} />]}
					>
						<Form.Input
							name="email"
							id="email"
							label="Name"
							type="text"
							placeholder="name@address.com"
							handleChange={handleChange}
							value={fields.email}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if (data.length && data.length <= 32) { return }
									return "Field must be between 1 and 32 characters long."
								}
							}}
						/>
						<Form.Input
							name="password"
							id="password"
							label="Password"
							type="password"
							placeholder="Enter your password"
							handleChange={handleChange}
							value={fields.password}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z]))/.test(data)&&data.length >= 8 && data.length <= 20) {return}
									return  "Field should contain at least one upper-case, at least one lower-case and at least one digit and be between 8 and 20"
								}
							}}
						/>
					</Form>
					<Link href="/join"><Button type="link">Join</Button></Link>
					<Link href="/create"><Button type="link">Create</Button></Link>
				</div>
			</div>
		</section >
	)
}
