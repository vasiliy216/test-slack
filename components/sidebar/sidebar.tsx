import { useState, useEffect } from "react"
import { useAppSelector } from "hooks/redux"
import { useDispatch } from "react-redux"
import { Button, Menu } from "antd"
import { setActiveChannel, setIsOpenCreateChannelModal } from "store"
// import { LinkCopied } from "components/link-copied"
import styles from "./sidebar.module.css"
import { useRouter } from "next/router"
import { CreateChannelModal } from "components/modals/create-channel-modal"
import { getChannel } from "api/channel"
import { Scrollbars } from "react-custom-scrollbars"

export function Sidebar() {
	const { channels, activeChannel } = useAppSelector(s => s.channels)
	const [selectedMenuItem, setSelectedMenuItem] = useState(activeChannel?.id)
	const router = useRouter()
	const dispatch = useDispatch()

	const handlerClick = (channelId: string) => {
		setSelectedMenuItem(channelId)
		dispatch(setActiveChannel(channelId))
		getChannel(channelId)
		router.push("/chat")
	}

	const channelsItems = [
		{
			label: "Channels",
			key: "submenu",
			children: channels.map(channel => ({ key: channel.id, label: channel.name }))
		}
	]

	useEffect(() => {
		setSelectedMenuItem(activeChannel?.id)
	}, [activeChannel])

	return (
		
		<div className={styles.sidebar}>
			<CreateChannelModal />
			<div>
				<Button
					className={styles.crateChannelBtn}
					onClick={() => dispatch(setIsOpenCreateChannelModal(true))}
					type="link"
				>
					Add Channels
				</Button>
				<Scrollbars  style={{ height: "90vh"}}>
					<Menu
						selectedKeys={selectedMenuItem ? [selectedMenuItem] : undefined}
						defaultOpenKeys={["submenu"]}
						defaultSelectedKeys={selectedMenuItem ? [selectedMenuItem] : undefined}
						mode="inline"
						theme="light"
						items={channelsItems}
						onClick={e => handlerClick(e.key)}
					></Menu>
				</Scrollbars>
			</div>
			{/* <div className={styles.link}>
				<LinkCopied />
			</div> */}
		</div>
		
	)
}