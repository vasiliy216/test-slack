import { Layout } from "components/layout"
import { Album } from "components/album"
import { GetServerSideProps } from "next"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { setActiveAlbum } from "store"

export default function AlbumPage({ activeAlbumId }: { activeAlbumId: string }) {
	const dispatch = useAppDispatch()
	const { albums } = useAppSelector(s => s.albums)
	useEffect(() => {
		if (activeAlbumId) {
			const currentAlbum = albums.find(a => a.id === activeAlbumId)
			if (currentAlbum) { dispatch(setActiveAlbum(currentAlbum)) }
		}
	}, [activeAlbumId, albums, dispatch])

	return (
		<Layout>
			<Album />
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return { props: { activeAlbumId: params?.id } }
}