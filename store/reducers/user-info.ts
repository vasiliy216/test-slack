import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "types"


const initialState: User = {
	id: "",
	avatar: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	circleId: "",
	username: ""
}

export const userSlice = createSlice({
	name: "user-info",
	initialState,
	reducers: {
		setUserInfo: (_, action: PayloadAction<User>) => action.payload,
		updateUseInfoProfile: (state, action) => {
			const { firstName, lastName } = action.payload
			state.firstName = firstName
			state.lastName = lastName
		},
		updateAvatar: (state, action) => {
			state.avatar = action.payload
		},
		deleteAvatar: (state) => {
			state.avatar = ""
		},
		setPassword: (state, action) => {
			state.password = action.payload
		}
	}
})

export const { setUserInfo, updateUseInfoProfile, updateAvatar, deleteAvatar, setPassword } = userSlice.actions

export const userInfoReducer = userSlice.reducer