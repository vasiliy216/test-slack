/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, message, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { updateUserImg } from "api/user"
import { updateAvatar } from "store"

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
	<div>
		{loading ? <LoadingOutlined /> : <PlusOutlined />}
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
)

export const Avatar = () => {
	const [loading, setLoading] = useState(false)
	const { id, avatar } = useAppSelector(s => s.userInfo)
	const dispatch = useAppDispatch()

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}
		if (info.file.status === "done") {
			getBase64(info.file.originFileObj as RcFile, async (url) => {
				await updateUserImg({
					file: url,
					fileName: info.file.fileName + "",
					userId: id,
					previewAvatar: avatar
				})
				dispatch(updateAvatar(url))
				setLoading(false)
			})
		}
	}
	const handlerDelete = async () => {
		setLoading(true)
		await updateUserImg({
			file: "",
			fileName: "",
			userId: id,
			previewAvatar: avatar
		})
		dispatch(updateAvatar(""))
		setLoading(false)
	}

	return (
		<>
			<ImgCrop>
				<Upload
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					beforeUpload={beforeUpload}
					onChange={handleChange}
				>
					{avatar ?
						<img src={avatar} alt="avatar" style={{ width: "100%" }} />
						: <UploadButton loading={loading} />}
				</Upload>
			</ImgCrop>
			{avatar && <Button danger type="link" onClick={handlerDelete}>Delete</Button>}
		</>
	)
}