import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { setMessages } from "store"
import { getMessagesByChannel } from "api/message"
import { getSocket } from "utils/get-socket"

export const useLoadMessages = async () => {
	const { activeChannel } = useAppSelector(s => s.channels)
	const dispatch = useAppDispatch()
	const loadMessagesHandle = useCallback(async () => {
		if (activeChannel) {
			const messages = await getMessagesByChannel(activeChannel.id)
			dispatch(setMessages(messages))

			getSocket().emit("joinChannel", activeChannel.id)
			getSocket().on("updateMessages", () => getSocket().emit("getMessagesByChannel", activeChannel.id))
		}
		getSocket().on("receiveMessagesFromChannel", messages => dispatch(setMessages(messages)))
	}, [activeChannel, dispatch])
	useEffect(() => {
		loadMessagesHandle()
	}, [loadMessagesHandle])
}