import { ReactNode, useEffect } from "react"
import Router from "next/router"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Loader } from "components/shared/loader"
import { useLoadUserInfo } from "hooks/use-load-user-info"
import { socket } from "utils/socket-io"
import { useAppSelector } from "hooks/redux"

type AuthLayoutType = {
	children: ReactNode
}

const ROUTE_AUTH = /album|chat|profile/

export const AuthLayout = ({ children }: AuthLayoutType) => {
	const { data: session, status } = useSession()
	const { id } = useAppSelector(s => s.circle)
	const { pathname } = useRouter()
	console.log("session", session)

	async function socketInitializer() {
		await fetch("/api/socket")
	}

	useEffect(() => {
		socketInitializer()
		return () => {
			socket.disconnect()
		}
	}, [])

	useLoadUserInfo(session?.user?.email as string)

	if (status === "unauthenticated" && ROUTE_AUTH.test(pathname)) {
		Router.push("/login")
		return <Loader />
	} else if (status === "loading" || (!id && ROUTE_AUTH.test(pathname))) {
		return <Loader />
	}
	return <div>{children}</div>
}
