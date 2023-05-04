
import { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import { Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { setActiveAlbum } from "store"
import { useAppDispatch } from "hooks/redux"
import { Profile } from "components/profile"
import { ChannelInfo } from "components/channel-info"
import { Loader } from "components/shared/loader"
import styles from "./header.module.css"

export function Header() {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const isChatRoute = router.pathname === "/chat"
	const isAlbumRoute = router.pathname === "/albums"
	const handlerClick = () => {
		router.push("/albums")
	}
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		Router.events.on("routeChangeStart", () => setLoading(true))
		Router.events.on("routeChangeComplete", () => setLoading(false))
		Router.events.on("routeChangeError", () => setLoading(false))
		return () => {
			Router.events.off("routeChangeStart", () => setLoading(true))
			Router.events.off("routeChangeComplete", () => setLoading(false))
			Router.events.off("routeChangeError", () => setLoading(false))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Router.events])

	return (
		<>
			{loading ? <Loader /> : <div className={styles.header}>
				{isChatRoute ?
					(<Button onClick={handlerClick} type="link">
						Albums
					</Button>)
					:
					<Button
						type="link"
						onClick={() => {
							if (isAlbumRoute) {
								router.push("/chat")
							} else {
								router.push("/albums")
								dispatch(setActiveAlbum({
									id: "",
									circleId: "",
									name: "",
									photos: [],
									userId: ""
								}))
							}
						}}
					>
						<ArrowLeftOutlined />
						Back
					</Button>}
				{isChatRoute && <ChannelInfo />}
				<Profile />
			</div>}
		</>
	)

}