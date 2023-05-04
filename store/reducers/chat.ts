import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message } from "types"
// import { getSocket } from "utils/get-socket"

type Chat = {
	editing: boolean,
	deleting: boolean,
	messages: Message[],
	activeMessage: Message
}

export const emptyMessageTemplate = {
	channelId: "",
	id: "",
	userId: "",
	text: "",
	date: ""
}

const initialState: Chat = {
	editing: false,
	deleting: false,
	messages: [],
	activeMessage: { ...emptyMessageTemplate }
}

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setMessages: (state, action) => {
			state.messages = action.payload
		},
		addMessages: (state, action: PayloadAction<Message>) => {
			// getSocket().emit("createMessage", action.payload)
			state.messages = [...state.messages, action.payload]
		},
		updateMessages: (state, action: PayloadAction<Message>) => {
			// getSocket().emit("updateMessageById", action.payload)
			const message = action.payload
			const data = state.messages.findIndex((c) => c.id == message.id)
			state.messages[data].text = message.text
		},
		deleteMessage: state => {
			const { id, channelId } = state.activeMessage
			// getSocket().emit("deleteMessageById", { id, channelId })
			state.messages = state.messages.filter(chatItem => chatItem.id !== id)
		},
		setActiveMessage: (state, action) => {
			console.log("ActiveMessage", action.payload)
			state.activeMessage = action.payload
		},
		setIsEditingMessage: (state, action) => {
			state.editing = action.payload
		},
		setEmptyMessage: (state) => {
			state.activeMessage = { ...emptyMessageTemplate }
		}
	}
})

export const {
	setMessages, addMessages, updateMessages, deleteMessage,
	setActiveMessage, setIsEditingMessage, setEmptyMessage
} = chatSlice.actions

export const chatReducer = chatSlice.reducer