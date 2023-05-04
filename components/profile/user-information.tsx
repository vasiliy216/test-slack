import { Button,  Drawer, Form, Input } from "antd"
import { useAppSelector } from "hooks/redux"
import React from "react"
import { Avatar } from "./avatar"
import { validationFirstName, validationSecondName } from "validation"
import { updateUseInfoProfile } from "store"
import { useDispatch } from "react-redux"
import { updateUser } from "api/user"
import styles from "./profile.module.css"
import { signOut} from "next-auth/react"
import { ChangePassword } from "./change-password"
type Props = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserInformation = (props: Props) => {
	const { open, setOpen } = props
	const dispatch = useDispatch()
	const { avatar, firstName, lastName, id, email, password, circleId, username } = useAppSelector(s => s.userInfo)
	const [form] = Form.useForm()

	const firstNameCurrent = Form.useWatch("firstName", form)
	const lastNameCurrent = Form.useWatch("lastName", form)

	const onReset = () => { form.resetFields() }

	const onFinish = async (values: object) => {
		dispatch(updateUseInfoProfile(values))
		await updateUser({
			avatar, firstName: firstNameCurrent, lastName: lastNameCurrent,
			id, email, password, circleId, username
		})
	}

	const isDisableBtns = firstName === firstNameCurrent
		&& lastName === lastNameCurrent

	const logOut = () => {
		signOut({ callbackUrl: "/login" })
	}

	const Node =()=>{
		return (
			<div className={styles.title}>
				<div >Profile</div>
				<Button onClick={logOut} type="primary">LogOut</Button>
			</div>
		)
	}
	return (
		<Drawer
			title={<Node/>}
	
			placement="right"
			onClose={() => setOpen(false)}
			open={open}
		>
			<Avatar />
			<Form
				form={form}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					initialValue={firstName}
					label="First Name"
					name="firstName"
					rules={validationFirstName}
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={lastName}
					label="Last Name"
					name="lastName"
					rules={validationSecondName}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button
						disabled={isDisableBtns}
						type="primary"
						htmlType="submit"
						style={{ marginRight: "10px" }}>
						Save
					</Button>
					<Button
						disabled={isDisableBtns}
						htmlType="button"
						onClick={onReset}>
						Reset
					</Button>
				</Form.Item>
			</Form>
			<ChangePassword/>
		</Drawer>
	)
}