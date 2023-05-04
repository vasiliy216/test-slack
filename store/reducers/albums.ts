import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Album } from "types"
// import { getSocket } from "utils/get-socket"

type InitialState = {
	albums: Album[]
	createModalOpen: boolean
	activeAlbum: Album
}
const initialState: InitialState = {
	albums: [],
	createModalOpen: false,
	activeAlbum: {
		id: "",
		circleId: "",
		name: "",
		photos: [],
		userId: ""
	}
}

export const albumsSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		deleteAlbum: (state, action) => {
			// getSocket().emit("deleteAlbumById", action.payload)
			state.albums = state.albums.filter(album => album.id !== action.payload)
		},
		setCreateAlbumModalOpen: (state, action) => {
			state.createModalOpen = action.payload
		},
		addAlbum: (state, action: PayloadAction<Album>) => {
			// getSocket().emit("createAlbum", action.payload)
			state.albums = [...state.albums, action.payload]
		},
		setActiveAlbum: (state, action: PayloadAction<Album>) => {
			state.activeAlbum = action.payload
		},
		setAlbums: (state, action) => {
			state.albums = action.payload
		},
		deletePhoto: (state, action) => {
			state.activeAlbum.photos = state.activeAlbum.photos.filter(
				(photo: string) => photo !== action.payload.link
			)
		},
		addPhoto: (state, action) => {
			state.activeAlbum.photos = [state.activeAlbum.photos, action.payload.link]
		},
		updateAlbum: (state, action) => {
			// getSocket().emit("updateCurrentAlbum")
			state.albums = state.albums.map(album =>
				album.id === action.payload.id ? action.payload : album
			)
			state.activeAlbum = action.payload
		}
	}
})

export const {
	deleteAlbum,
	setCreateAlbumModalOpen,
	addAlbum,
	setActiveAlbum,
	deletePhoto,
	addPhoto,
	updateAlbum,
	setAlbums
} = albumsSlice.actions

export const albumReducer = albumsSlice.reducer
