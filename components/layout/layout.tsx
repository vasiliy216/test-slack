import { ReactNode } from "react"
import { Sidebar } from "../sidebar/sidebar"
import styles from "./layout.module.css"
import { Header } from "components/header/header"
import { useLoadChannels } from "hooks/use-load-channels"
import { useLoadUsers } from "hooks/use-load-users"
import { useLoadAlbums } from "hooks/use-load-albums"

type Props = {
	children?: ReactNode
}

export function Layout({ children }: Props) {
	useLoadChannels()
	useLoadUsers()
	useLoadAlbums()
	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.leftPanel}><Sidebar /></div>
				<div className={styles.rightPanel}>{children}</div>
			</div>
		</>
	)
}