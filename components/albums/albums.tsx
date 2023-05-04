import Image from "next/image"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SvgIcons } from "components/svg-icons/svg-icons"
import { deleteAlbum, setCreateAlbumModalOpen, setAlbums, setActiveAlbum } from "store"
import { Album } from "types"
import { ModalAlbum } from "components/modals/modal-album/modal-album"
import styles from "./albums.module.css"
import { useRouter } from "next/router"
import { useAppSelector } from "hooks/redux"
import { getSocket } from "utils/get-socket"
import Scrollbars from "react-custom-scrollbars"

export function Albums() {
	const dispatch = useDispatch()
	const { albums: { albums, activeAlbum }, userInfo } = useAppSelector(s => s)
	const { id: circleId } = useAppSelector(s => s.circle)
	const router = useRouter()
	const handlerClick = (id: string) => {
		router.push(`/albums/${id}`)
	}

	const handlerDelete = async (e: React.MouseEvent<HTMLDivElement>, id: string) => {
		e.stopPropagation()
		dispatch(deleteAlbum(id))
	}

	useEffect(() => {
		getSocket().on("updateAlbums", () => {
			getSocket().emit("getAlbumsByCircleId", circleId)
		})
		getSocket().on("receiveAlbumsFromCirce", (albums: Album[]) => {
			if (activeAlbum && albums.map(album => album.id).includes(activeAlbum.id)) {
				dispatch(setActiveAlbum(albums.find(album => album.id === activeAlbum.id) as Album))
			}
			dispatch(setAlbums(albums))
		}
		)
	}, [circleId, dispatch, activeAlbum])

	useEffect(() => {
		getSocket().emit("joinAlbumSpace")
		return () => {
			getSocket().emit("leaveAlbumSpace")
		}
	}, [])

	return (
		<Scrollbars >
			<div className={styles.container}>
				{albums && albums?.map((album: Album) => {
					return (
						<div key={album.id} className={styles.cardContainer}>
							<div className={styles.card}>
								<div
									className={styles.mask}
									onClick={() => {
										handlerClick(album.id)
									}}
								>
									<div className={styles.eye}>{SvgIcons.eye}</div>
									{album.userId == userInfo.id ? <div
										className={styles.bucketIcon}
										onClick={e => {
											handlerDelete(e, album.id)
										}}
									>
										{SvgIcons.bucket}
									</div> : null}
								</div>
								<Image
									src={album.photos.length ? album.photos[0] : "/no-image.png"}
									alt="preview"
									width={240}
									height={240}
									className={styles.image}
								/>
								<div className={styles.text}>
									<b>{album.name}</b>
								</div>
							</div>
						</div>
					)
				})}
				<div onClick={() => dispatch(setCreateAlbumModalOpen(true))} className={styles.cardContainer}>
					<div className={styles.card}>
						<Image
							className={styles.img}
							alt="Avatar"
							width={240}
							height={240}
							src="add_folder.svg"
						/>
						<div className={styles.text}>
							<h4>
								<b>Create new</b>
							</h4>
						</div>
					</div>
				</div>
				<ModalAlbum />
			</div>
		</Scrollbars>
	)
}
