import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Circle } from "types"

const initialState: Circle = {
	id: "",
	passCode: ""
}

export const circleSlice = createSlice({
	name: "circle",
	initialState,
	reducers: {
		setCircle: (_, action: PayloadAction<Circle>) => action.payload
	}
})

export const { setCircle } = circleSlice.actions

export const circleReducer = circleSlice.reducer