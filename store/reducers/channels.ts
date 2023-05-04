import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Channel } from "types"
import { getSocket } from "utils/get-socket"


type Channels = {
	channels: Channel[]
	activeChannel: null | Channel
	isOpenChannelInfoModal: boolean
	isOpenCreateChannelModal: boolean
}

const initialState: Channels = {
	channels: [],
	activeChannel: null,
	isOpenChannelInfoModal: false,
	isOpenCreateChannelModal: false
}

export const channelsSlice = createSlice({
	name: "channels",
	initialState,
	reducers: {
		setChannels: (state, action) => {
			state.channels = action.payload
		},
		addChannel: (state, action: PayloadAction<Channel>) => {
			getSocket().emit("createChannel", action.payload)
			state.channels = [...state.channels, action.payload]
		},
		setActiveChannel: (state, action) => {
			const data = state.channels.find(c => c.id === action.payload) as Channel
			state.activeChannel = data
			state.isOpenChannelInfoModal = false
		},
		setIsOpenChannelInfoModal: (state, action) => {
			state.isOpenChannelInfoModal = action.payload
		},
		setIsOpenCreateChannelModal: (state, action) => {
			state.isOpenCreateChannelModal = action.payload
		},
		deleteChannel: (state, action) => {
			const circleId = state.activeChannel?.circleId
			getSocket().emit("deleteChannelById", { id: action.payload, circleId })
			state.channels = state.channels.filter(channel => channel.id !== action.payload)
		}
	}
})

export const {
	addChannel, setActiveChannel, setChannels,
	setIsOpenChannelInfoModal, setIsOpenCreateChannelModal, deleteChannel
} = channelsSlice.actions

export const channelsReducer = channelsSlice.reducer