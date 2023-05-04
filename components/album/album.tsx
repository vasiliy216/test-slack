/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Modal } from "antd"
import { Album } from "types"
import { setAlbums, setActiveAlbum } from "store"
import { useDispatch } from "react-redux"
import { SvgIcons } from "components/svg-icons/svg-icons"
import { deletePhotoFromAlbum } from "api/album"
import { useAppSelector } from "hooks/redux"
import { UploadPhoto } from "./upload-photo"
import styles from "./album.module.css"
import { updateCurrentAlbum } from "utils/update-current-album"
import { getSocket } from "utils/get-socket"
import Scrollbars from "react-custom-scrollbars"

export function Album() {
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [selectedPhoto, setSelectedPhoto] = useState("")
	const { activeAlbum } = useAppSelector(s => s.albums)
	const { id: circleId } = useAppSelector(s => s.circle)

	const handlerDelete = async (e: React.MouseEvent, photo: string, position: number) => {
		e.stopPropagation()
		setLoading(true)
		await deletePhotoFromAlbum(photo, activeAlbum.id, position)
		await updateCurrentAlbum()
		setLoading(false)
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
			<div className={`${styles.container} ${loading ? "custom-loader-spinner" : ""}`}>
				{activeAlbum?.photos.map((photo: string, index: number) => {
					return (
						<div key={index} className={styles.cardContainer}>
							<div className={styles.card}>
								<div className={styles.mask} onClick={() => setSelectedPhoto(photo)}>
									<div className={styles.eye} >
										{SvgIcons.eye}
									</div>
									<div className={styles.bucketIcon} onClick={(e) => handlerDelete(e, photo, index)}>
										{SvgIcons.bucket}
									</div>
								</div>
								<Image src={photo} alt="userImage" width={240} height={264} className={styles.image} />
							</div>
						</div>
					)
				})}
				<Modal
					centered
					open={!!selectedPhoto}
					onOk={() => setSelectedPhoto("")}
					onCancel={() => setSelectedPhoto("")}
					closable={false}
					footer={null}
					width={460}
				>
					<div className={styles.modal}>
						<img src={selectedPhoto} alt="userImage" width={410} height={400} className={styles.image} />
					</div>
				</Modal>
				<div className={styles.cardContainer} >
					<div className="uploadPhoto">
						<UploadPhoto />
					</div>
				</div>
			</div>
		</Scrollbars>
	)
}