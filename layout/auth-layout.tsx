import { ReactNode, useEffect } from "react"
import Router from "next/router"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Loader } from "components/shared/loader"
import { useLoadUserInfo } from "hooks/use-load-user-info"
// import { socket } from "utils/socket-io"
import { useAppSelector } from "hooks/redux"

type AuthLayoutType = {
	children: ReactNode
}

let socket: WebSocket

const ROUTE_AUTH = /album|chat|profile/

export const AuthLayout = ({ children }: AuthLayoutType) => {
	const { data: session, status } = useSession()
	const { id } = useAppSelector(s => s.circle)
	const { pathname } = useRouter()
	console.log("session", session)
	const connect = () => {
		const socket = new WebSocket("wss://test-slack-alpha.vercel.app:8081")
		socket.onopen = function () {
			console.log("Connect")
			socket.send("test")
		}
		socket.onmessage = function (e) {
			console.log(e, e.data)
		}

		socket.onclose = function (e) {
			console.log("Socket is closed. Reconnect will be attempted in 1 second.", e.reason)
			setTimeout(function () {
				connect()
			}, 1000)
		}

		socket.onerror = function (err) {
			console.error("Socket encountered error: ", err, "Closing socket")
			socket.close()
		}
	}

	async function socketInitializer() {
		await fetch("/api/socket")
		connect()
	}

	useEffect(() => {
		socketInitializer()
		// return () => {
		// 	socket
		// }
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
