import { NextApiRequest } from "next"
import { Circle } from "types"
import { getBaseUrl } from "utils/get-base-url"

export const getCircles = async (req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/circles`, {
			method: "GET"
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
export const getCircle = async (id: string, req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/circles?id=${id}`, {
			method: "GET"
		})
		const json = await res.json()
		return json || [json]
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
export const createCircle = async (circle: Circle,req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/circles`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ circle })
		})
		const json = await res.json()
		return {
			status: res.status === 200

		}
	} catch (error) {
		console.log(error)
		return {
			status: false, message: "Something was wrong", data: null
		}
	}
}
export const updateCircle = async (circle: Circle, id: string) => {
	try {
		const res = await fetch("/api/circles", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ circle, id })
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
export const deleteCircle = async (id: string) => {
	try {
		const res = await fetch("/api/circles", {
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
		return {
			status: false, message: "Something was wrong", data: null
		}
	}
} 