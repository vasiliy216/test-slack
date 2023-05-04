import { getBaseUrl } from "utils/get-base-url"
import { NextApiRequest } from "next/types"
import { Album as AlbumType } from "types"
import { getCircleId } from "utils/get-circle-id"

// type GetAlbumsProps = {
// 	req?: NextApiRequest
// }

const fixedPhotosType = (album: AlbumType) => ({
	...album, photos: JSON.parse(album.photos as unknown as string)
})

// export const getAlbums = async (props: GetAlbumsProps) => {
// 	const { req } = props
// 	try {
// 		const res = await fetch(`${getBaseUrl(req)}/api/albums?circleId=${getCircleId()}`, {
// 			method: "GET"
// 		})
// 		const json = await res.json()
// 		console.log("json", json)
// 		return json.map(fixedPhotosType)
// 	} catch (error) {
// 		console.log(error)
// 		return { status: false, message: "Something was wrong" }
// 	}
// }

export const getAlbumsFront = async () => {
	try {
		const res = await fetch(`/api/albums?circleId=${getCircleId()}`, {
			method: "GET"
		})
		const json = await res.json()
		console.log("json", json)
		return json.map(fixedPhotosType)
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

type getAlbumProps = {
	req?: NextApiRequest
	id: string
}

export const getAlbum = async ({ req, id }: getAlbumProps) => {
	try {
		const res = await fetch(`${getBaseUrl(req)}/api/albums?id=${id}`, {
			method: "GET"
		})
		const [album] = await res.json()
		return { status: true, album: fixedPhotosType(album) }
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", album: null }
	}
}

export const createAlbumApi = async (album: AlbumType) => {
	try {
		const res = await fetch("/api/albums",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ album })
			})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}

	} catch (error) {
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const updateAlbum = async (album: AlbumType, id: string) => {
	try {
		const res = await fetch("/api/albums",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ album, id })
			})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}

	} catch (error) {
		return { status: false, message: "Something was wrong", data: null }
	}
}

type addPhotoToAlbumProps = {
	file: string
	fileName: string
	albumId: string
}

export const addPhotoToAlbum = async (props: addPhotoToAlbumProps) => {
	const { file, fileName, albumId } = props
	try {
		const res = await fetch("/api/albums",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					file, fileName, albumId,
					circleId: getCircleId(), action: "add"
				})
			})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}

	} catch (error) {
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const deletePhotoFromAlbum = async (link: string, albumId: string, position: number) => {
	try {
		const res = await fetch("/api/albums",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					link, albumId, action: "delete", position
				})
			})
		console.log("link, albumId, action: , position", link, albumId, position)
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}

	} catch (error) {
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const deleteAlbumApi = async (id: string) => {
	try {
		const res = await fetch("/api/albums",
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""
		}

	} catch (error) {
		return { status: false, message: "Something was wrong", data: null }
	}
}
