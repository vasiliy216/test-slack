import { useState } from "react"
import { Button, Tooltip } from "antd"
import Router from "next/router"
import { signIn } from "next-auth/react"
import { CreateAuth } from "components/create-auth"
import { Form } from "components/shared/form"
import { showWarningNotification, showSuccessNotification } from "components/shared/notification"
import styles from "./login/login.module.css"
import Link from "next/link"
import { getUniqueId } from "utils/get-unique-id"

type FormButtonType = { loaderBtn: boolean }

const FormButton = ({ loaderBtn }: FormButtonType) => (
	<Button size="large" type="primary" htmlType="submit" loading={loaderBtn} block>Create</Button>
)

export default function Create() {
	const [fields, setFields] = useState({
		email: "",
		password: "",
		spaceName: "",
		passCode: "",
		firstName: "",
		lastName: ""
	})

	const [loaderBtn, setLoaderBtn] = useState(false)
	const [isAuth, setIsAuth] = useState(false)

	const handlerGenerate = () => {
		const passCode = getUniqueId().substring(0, 6)
		setFields((prevState) => ({ ...prevState, passCode: passCode }))
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setFields(prevState => ({ ...prevState, [name]: value }))
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(fields.passCode)
		if (fields.passCode === "") {
			showWarningNotification("Generate PassCode firstly!")
		} else {
			showSuccessNotification(`PassCode ${fields.passCode} has been copied`)
		}
	}

	const onSubmit = async () => {
		setLoaderBtn(true)
		const request = { ...fields, password: window.btoa(fields.password) }
		const res = await signIn("create", { ...request, redirect: false })
		setLoaderBtn(false)

		if (res?.error === "The letter was sent to the post office.") {
			showSuccessNotification(res?.error)
			return Router.push("/login")
		}
		if (res?.error) { return showWarningNotification(res?.error) }
	}

	if (!isAuth) { return (<CreateAuth setIsAuth={setIsAuth} />) }

	return (
		<section className={styles.auth_section}>
			<div className={`container ${styles.auth_flex}`}>
				<div className={styles.auth_body}>
					<h1 className={styles.auth_title}>Create</h1>
					<Form
						onSubmit={onSubmit}
						buttons={[<FormButton key="submit" loaderBtn={loaderBtn} />]}
					>
						<Form.Input
							name="spaceName"
							id="spaceName"
							label="Space name"
							type="text"
							placeholder="Space name"
							handleChange={handleChange}
							value={fields.spaceName}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if (/^[a-zA-Z0-9]+$/.test(data) && data.length >= 1 && data.length <= 32) { return }
									return "Field accepts alphabetical char and digits, no special chars allowed, limited to 32 characters"
								}
							}}
						/>
						<div className={styles.passCode}>
							<Form.Input
								name="passCode"
								id="passCode"
								label="Passcode"
								type="text"
								className={styles.passCode_input}
								placeholder="Passcode"
								handleChange={() => false}
								value={fields.passCode}
								validation={{ required: "This input is required." }}
							/>
							<div className={styles.generate}>
								<Tooltip title="Please save this passcode securely to share with people you want to to join your circle">
									<Button type="primary" onClick={handlerGenerate}>Generate</Button>
								</Tooltip>
								<Button type="primary" onClick={handleCopy}>Copy</Button>
							</div>

						</div>
						<Form.Input
							name="firstName"
							id="firstName"
							label="First name"
							type="text"
							placeholder="First name"
							handleChange={handleChange}
							value={fields.firstName}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if (/^[a-zA-Z0-9]+$/.test(data) && data.length >= 1 && data.length <= 32) { return }
									return "Field accepts alphabetical char and digits, no special chars allowed, limited to 32 characters"
								}
							}}
						/>
						<Form.Input
							name="lastName"
							id="lastName"
							label="Last name"
							type="text"
							placeholder="Last name"
							handleChange={handleChange}
							value={fields.lastName}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if (/^[a-zA-Z0-9]+$/.test(data) && data.length >= 1 && data.length <= 32) { return }
									return "Field accepts alphabetical char and digits, no special chars allowed, limited to 32 characters"
								}
							}}
						/>
						<Form.Input
							name="email"
							id="email"
							label="Email"
							type="text"
							placeholder="name@address.com"
							handleChange={handleChange}
							value={fields.email}
							validation={{
								required: "This input is required.",
								validate: (data: string) => {
									if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data)) { return }
									return "Invalid email address."
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
									if (/((?=.*\d)(?=.*[A-Z])(?=.*[a-z]))/.test(data) && data.length >= 8 && data.length <= 20) { return }
									return "Field should contain at least one upper-case, at least one lower-case and at least one digit and be between 8 and 20"
								}
							}}
						/>
					</Form>
					<Link href="/login"><Button type="link">Login</Button></Link>
				</div>
			</div>
		</section>
	)
}