
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { setAlbums } from "store"
import { getAlbumsFront } from "api/album"
import { Album } from "types"
// import { getSocket } from "utils/get-socket"
export const useLoadAlbums = async () => {

	const { id: circleId } = useAppSelector(s => s.circle)
	const dispatch = useAppDispatch()
	// const loadAlbumsHandle = useCallback(async () => {
	// 	const albums = await getAlbumsFront()
	// 	console.log("getAlbumsFront", albums)
	// 	dispatch(setAlbums(albums))
	// 	getSocket().emit("joinCircle", circleId)
	// 	getSocket().on("updateAlbums", () => getSocket().emit("getAlbumsByCircle", circleId))

	// 	getSocket().on("receiveAlbumsFromCircle", (albums: Album[]) => dispatch(setAlbums(albums)))
	// }, [dispatch, circleId])
	// useEffect(() => {
	// 	loadAlbumsHandle()
	// }, [loadAlbumsHandle])
}