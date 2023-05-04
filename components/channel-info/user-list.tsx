import { Avatar, Button, List } from "antd"
import { useAppSelector } from "hooks/redux"
import { User } from "types"

const ListItem = ({ user }: { user: User }) => {
	return (
		<List.Item>
			<List.Item.Meta
				avatar={<Avatar src={user.avatar} />}
				title={user.firstName + " " + user.lastName}
			/>
			<Button type="link">delete</Button>
		</List.Item>
	)
}

export const UserList = () => {
	const { users, channels: { isOpenChannelInfoModal } } = useAppSelector(s => s)
	if (!isOpenChannelInfoModal) { return null }
	return (
		<div>
			<List
				itemLayout="horizontal"
				dataSource={users}
				renderItem={(user) => <ListItem user={user} />}
			/>
		</div>
	)
}