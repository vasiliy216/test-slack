import { useState } from "react"
import { Button, Collapse, Form, Input } from "antd"
import { updatePassword } from "api/user"
import { showSuccessNotification, showWarningNotification } from "components/shared/notification"
import { validationPassword } from "validation"

export const ChangePassword = () => {
	const { Panel } = Collapse
	const [formChangePassword] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)
	
	const oldPassword =Form.useWatch("oldPassword",formChangePassword)
	const newPassword =Form.useWatch("newPassword",formChangePassword)
	const isDisableBtn= oldPassword||newPassword!==""
	
	const onFinish = async (values: { oldPassword: string, newPassword: string }) => {
		setLoading(true)
		const res = await updatePassword(window.btoa(values.oldPassword), window.btoa(values.newPassword))
		setLoading(false)
		if (res.status) { showSuccessNotification("Password has been changed") }
		else { showWarningNotification(res.message) }

		formChangePassword.resetFields()
	}

	return (
		<Collapse ghost>
			<Panel header="Change password" key="1">
				<Form
					form={formChangePassword}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						initialValue=""
						label="Old password"
						name="oldPassword"
						rules={validationPassword}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						initialValue=""
						label="New password"
						name="newPassword"
						rules={validationPassword}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button
							disabled={!isDisableBtn}
							loading={loading}
							type="primary"
							htmlType="submit"
							style={{ marginRight: "10px" }}>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Panel>

		</Collapse>
	)
}