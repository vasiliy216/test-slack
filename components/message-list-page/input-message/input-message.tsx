import React, { useEffect, useState } from "react"
import { useAppSelector } from "hooks/redux"
import { useDispatch } from "react-redux"
import {
	addMessages, emptyMessageTemplate, setEmptyMessage,
	setIsEditingMessage, updateMessages
} from "store"
import { SvgIcons } from "components/svg-icons/svg-icons"
import { Message } from "types"
import styles from "./input-message.module.css"
import { formats, modules } from "./configs"
import { getUniqueId } from "utils/get-unique-id"
import "react-quill/dist/quill.snow.css"

const ReactQuill = typeof window === "object" ? require("react-quill") : () => false

const getIsValidRichText = (richText: string) => richText.replaceAll("<p>", "")
	.replaceAll("<br>", "")
	.replaceAll("</p>", "")
	.replaceAll("&nbsp;", "").trim()

export const InputMessage = () => {
	const dispatch = useDispatch()
	const { chat: { activeMessage, editing }, userInfo, channels: { activeChannel } } = useAppSelector(s => s)
	const [itemMassage, setItemMassage] = useState<Message>(activeMessage)

	const result = getIsValidRichText(itemMassage.text)
	const handleSubmit = async () => {
		if (result.length) {
			setItemMassage({ ...itemMassage, text: getIsValidRichText(itemMassage.text) })
			if (editing) {
				dispatch(updateMessages(itemMassage))
			} else {
				const message = {
					...itemMassage,
					channelId: activeChannel?.id as string,
					id: getUniqueId(),
					userId: userInfo.id,
					date: new Date().getTime() + ""
				}
				dispatch(addMessages(message))
			}
			dispatch(setEmptyMessage())
			setItemMassage({ ...emptyMessageTemplate })
			dispatch(setIsEditingMessage(false))
		}
	}

	useEffect(() => {
		if (editing) { setItemMassage(activeMessage) }
	}, [activeMessage, editing])

	const checkLength = (e: React.KeyboardEvent<HTMLElement>) => {
		if ((getIsValidRichText(itemMassage.text).length > 300) && (e.key !== "Backspace")) {
			e.preventDefault()
		}
	}
	return (
		<div className={styles.wrapper}>
			<ReactQuill
				onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => checkLength(e)}
				theme="snow"
				value={itemMassage.text}
				onChange={(value: string) => {
					setItemMassage((prevState) => ({ ...prevState, text: value }))
				}}
				modules={modules}
				formats={formats}
				readOnly={false}
				className="custom-WYSIWYG in-tab-pane"
			/>
			{result ? (
				<div className={styles.sendIcon} onClick={handleSubmit}>
					{SvgIcons.send}
				</div>
			) : null}
		</div>
	)
}
