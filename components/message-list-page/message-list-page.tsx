import { useAppSelector } from "hooks/redux"
import { ChatList } from "./chat-list"
import { InputMessage } from "./input-message"
import styles from "./message-list-page.module.css"

export function MessageListPage() {
	const { activeChannel } = useAppSelector(s => s.channels)
	if (!activeChannel) { return null }

	return (
		<div className={styles.container}>
			<ChatList />
			<InputMessage />
		</div>
	)
}
