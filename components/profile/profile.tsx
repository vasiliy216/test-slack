import React, { useState } from "react"
import { Avatar } from "antd"
import { useAppSelector } from "hooks/redux"
import { UserInformation } from "./user-information"
import styles from "./profile.module.css"


export const Profile = () => {
	const { avatar, firstName } = useAppSelector(s => s.userInfo)
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.container}>
			<Avatar
				className={styles.avatar}
				onClick={() => setOpen(true)}
				src={avatar}
			>
				{firstName[0]}
			</Avatar>
			<UserInformation
				open={open}
				setOpen={setOpen}
			/>
		</div>
	)
}