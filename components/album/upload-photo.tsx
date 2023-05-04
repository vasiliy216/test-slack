/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { message, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import { addPhotoToAlbum } from "api/album"
import { getActiveAlbum } from "utils/get-active-album"
import { useRouter } from "next/router"
import { updateCurrentAlbum } from "utils/update-current-album"

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener("load", () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!")
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!")
	}
	return isJpgOrPng && isLt2M
}

const UploadButton = ({ loading }: { loading: boolean }) => (
	<div className="UploadButtonPhotos">
		{loading ? <LoadingOutlined /> : <PlusOutlined />}
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
)

export const UploadPhoto = () => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}
		if (info.file.status === "done") {
			console.log("getActiveAlbum()", getActiveAlbum())
			getBase64(info.file.originFileObj as RcFile, async (url) => {
				await addPhotoToAlbum({
					file: url, fileName: info.file.fileName + "",
					albumId: router.query.id as string
				})
				await updateCurrentAlbum()
				setLoading(false)
			})
		}
	}

	return (
		<ImgCrop>
			<Upload
				listType="picture-card"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				<UploadButton loading={loading} />
			</Upload>
		</ImgCrop>
	)
}