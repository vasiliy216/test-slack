import { NextApiRequest } from "next"
import { getBaseUrl } from "utils/get-base-url"
import { getParams } from "utils/get-params"
import { User, TransformationType } from "types"
import { getCircleId } from "utils/get-circle-id"

export const getCircleUsers = async () => {
	try {
		const res = await fetch(`/api/users?circleId=${getCircleId()}`, {
			method: "GET"
		})
		const json = await res.json()
		return json || [json]
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
export const getUser = async (user?: TransformationType<User>, req?: NextApiRequest) => {
	try {
		const params = getParams(user as User, "query")
		const query = params ? `?${params}` : ""

		const res = await fetch(`${getBaseUrl(req)}/api/users${query}`, {
			method: "GET"
		})
		const json = await res.json()
		return json || [json]
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const createUser = async (user?: TransformationType<User>, req?: NextApiRequest) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user })
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const updateUser = async (user?: TransformationType<User> & { id: string }, req?: NextApiRequest) => {
	try {
		delete user?.avatar
		const res = await fetch(`${getBaseUrl(req)}/api/users`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user })
		})
		const json = await res.json()
		console.log("json-front", json)
		return {
			status: res.status === 200,
			message: json.message || ""
		}
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
}

type updateUserImgProps = {
	file: string
	fileName: string
	userId: string
	previewAvatar: string
}

export const updateUserImg = async (user: updateUserImgProps) => {
	const { file, fileName, userId, previewAvatar } = user
	try {
		const res = await fetch("/api/users", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				file, fileName, userId, circleId: getCircleId(),
				previewAvatar, action: "updateAvatar"
			})
		})
		const json = await res.json()
		console.log("json-front", json)
		return {
			status: res.status === 200,
			message: json.message || ""
		}
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const deleteUser = async (circleId: string, id: string) => {
	try {
		const res = await fetch("/api/users", {
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
export const updatePassword = async (oldPassword: string, newPassword: string, req?: NextApiRequest) => {
	try {

		const res = await fetch(`${getBaseUrl(req)}/api/password`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ oldPassword, newPassword })
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
