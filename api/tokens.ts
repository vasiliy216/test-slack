import { NextApiRequest } from "next"
import { getBaseUrl } from "utils/get-base-url"
import { getParams } from "utils/get-params"
import { Token, TransformationType } from "types"

export const getToken = async (token?: TransformationType<Token>, req?: NextApiRequest) => {
	try {
		const params = getParams(token as Token, "query")
		const query = params ? `?${params}` : ""

		const res = await fetch(`${getBaseUrl(req)}/api/token${query}`, {
			method: "GET"
		})
		const json = await res.json()
		return json || []
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const createToken = async (token?: TransformationType<Token>, req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token })
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const deleteToken = async (id: string, req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/token`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(id)
		})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
} 