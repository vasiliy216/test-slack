import { getAlbum } from "api/album"
import Router from "next/router"
import { store, updateAlbum } from "store"

export const updateCurrentAlbum = async () => {
	const { status, album } = await getAlbum({ id: Router.query.id as string })
	if (status && album) {
		store.dispatch(updateAlbum(album))
	}
}
