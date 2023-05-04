import { Channel } from "types"
import { getCircleId } from "utils/get-circle-id"

export const getChannels = async () => {
	try {
		const res = await fetch(`/api/channels?circleId=${getCircleId()}`, {
			method: "GET"
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const getChannel = async (id: string) => {
	try {
		const res = await fetch(`api/channels?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const json = await res.json()

		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const createChannel = async (channel: Channel) => {
	try {
		const res = await fetch("/api/channels", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ channel })
		})
		return { status: res.status === 200 }
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
}
export const updateChannel = async (channel: Channel, id: string) => {
	try {
		const res = await fetch("/api/channels", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ channel, id })
		})
		return { status: res.status === 200 }
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const deleteChannelApi = async (id: string) => {
	try {
		const res = await fetch("/api/channels", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		})
		return { status: res.status === 200 }
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
} 