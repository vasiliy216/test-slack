const { IMAGES_API_URL } = process.env

export const deletePhotoFromS3 = async (fileUrl: string) => {
	try {
		await fetch(IMAGES_API_URL as string, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ fileUrl })
		})
	} catch (error) {
		console.log("error", error)
	}
}

export const savePhotoToS3 = async (file: string, fileName: string, id: string) => {
	const response = await fetch(IMAGES_API_URL as string, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ file, fileName, id })
	})
	const { link } = await response.json()
	return link
}
