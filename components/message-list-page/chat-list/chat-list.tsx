import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "hooks/redux"
import { Avatar, Card } from "antd"
import parse from "html-react-parser"
import { format } from "date-fns"
import { deleteMessage, setActiveMessage, setIsEditingMessage } from "store"
import styles from "./chat-list.module.css"
import type { MenuProps } from "antd"
import { Dropdown } from "antd"
import { useLoadMessages } from "hooks/use-load-messages"
import { getUserById } from "utils/get-user-by-id"
import Scrollbars from "react-custom-scrollbars"

const { Meta } = Card

const items: MenuProps["items"] = [
	{ key: "delete", label: <p>Delete message</p> },
	{ key: "edit", label: <p>Edit message</p> }
]

type TitleItemProps = { name: string, date: string }
const TitleItem = ({ name, date }: TitleItemProps) => (
	<div>{name}<span className={styles.date}>{format(new Date(+date), "H:mm:ss")}</span></div>
)

export const ChatList = () => {
	useLoadMessages()
	const { messages } = useAppSelector(s => s.chat)
	const { id: currentUserId } = useAppSelector(s => s.userInfo)
	const dispatch = useDispatch()
	const scrollBarsRef = useRef(null)

	useEffect(() => {
		if (scrollBarsRef.current) {
			(scrollBarsRef.current as HTMLDivElement)?.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key == "delete") {
			dispatch(deleteMessage())
		} else if (key == "edit") {
			dispatch(setIsEditingMessage(true))
		}
	}
	const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const maxHeightForScroll = height - 199 + "px"

	const processedHtml = (html: string) => html.replace(/(^( *<p><br><\/p>)*)|((<p><br><\/p>)* *$)/gi, "").trim()
	return (

		<div className={styles.containerChat} ref={(ref) => console.log(ref)}>
			<Scrollbars ref={scrollBarsRef} autoHeight autoHeightMax={maxHeightForScroll} >
				{messages?.map((message) => {
					const user = getUserById(message.userId)
					return (
						<Dropdown
							key={message.id}
							menu={{ items, onClick }}
							placement="topLeft"
							trigger={["contextMenu", "click"]}
							arrow={{ pointAtCenter: true }}
							disabled={currentUserId !== message.userId}
						>
							<Card
								key={message.id}
								style={{ marginTop: 0, border: "none" }}
								onClick={() => dispatch(setActiveMessage((message)))}
								onContextMenu={() => dispatch(setActiveMessage((message)))} hoverable={true}
							>
								<Meta
									avatar={<Avatar shape="square" src={user.avatar} />}
									title={<TitleItem name={user.firstName + " " + user.lastName} date={message.date} />}
									description={parse(processedHtml(message.text))}
									className={styles.card}
								/>
							</Card>
						</Dropdown>
					)
				})}
			</Scrollbars>
		</div>


	)
}
