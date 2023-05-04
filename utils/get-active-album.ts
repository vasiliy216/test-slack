import { store } from "store"
import { Album } from "types"

export const getActiveAlbum = () => {
	const albumId = window.location.pathname.split("/").pop()
	return store.getState().albums.albums.find(a => a.id === albumId) as Album
}