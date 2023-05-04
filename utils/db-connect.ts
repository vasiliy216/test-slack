import { NextApiRequest } from "next/types"
import { DBModalType } from "custom-db"
import { getBaseUrl } from "utils/get-base-url"

type Props = {
	data?: DBModalType
	method: "GET" | "POST"
	req: NextApiRequest
}

export const DbConnect = async (props: Props) => {
	const { data, method, req } = props
	try {
		let head = null
		if (method === "GET") {
			head = { method }
		} else {
			head = {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data })
			}
		}
		const res = await fetch(`${getBaseUrl(req)}/api/db/db-controller`, { ...head })

		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { error, message: "Something was wrong", data: null }
	}
}