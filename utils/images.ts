export const addImageToS3 = async (image: string, circle: string) => {
	try {
		const res = await fetch("/api/user-images", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ image, circle })
		})

		return await res.json()
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const deleteImageFromS3 = async (images: string[]) => {
	try {
		const res = await fetch("/api/user-images", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ images })
		})

		const json = await res.json()
		return {
			status: json.statusCode
		}
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
