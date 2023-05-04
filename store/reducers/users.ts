import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "types"

const initialState: User[] = []

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setCircleUsers: (_, action: PayloadAction<User[]>) => action.payload
	}
})

export const { setCircleUsers } = usersSlice.actions

export const usersReducer = usersSlice.reducer