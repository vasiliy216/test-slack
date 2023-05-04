import { Form, Input, Modal } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { addAlbum, setCreateAlbumModalOpen } from "store"
import { getUniqueId } from "utils/get-unique-id"
import { useAppSelector } from "hooks/redux"
import { getCircleId } from "utils/get-circle-id"
import { validationAlbumName } from "validation"
import { showSuccessNotification, showWarningNotification } from "components/shared/notification"

interface Values {
	title: string
}

interface CollectionCreateFormProps {
	open: boolean
	onCreate: (values: Values) => void
	onCancel: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ onCreate, onCancel }) => {
	const { createModalOpen } = useAppSelector(s => s.albums)
	const [form] = Form.useForm()

	return (
		<Modal
			open={createModalOpen}
			title="Create a new Album"
			okText="Create"
			cancelText="Cancel"
			onCancel={() => {
				form.resetFields()
				onCancel()
			}}
			onOk={() => {
				form
					.validateFields()
					.then(values => {
						form.resetFields()
						onCreate(values)
					})
					.catch(info => {
						console.log("Validate Failed:", info)
					})
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
			>
				<Form.Item
					name="title"
					rules={validationAlbumName}
				>
					<Input placeholder="Please input the title of the album" />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export const ModalAlbum: React.FC = () => {
	const dispatch = useDispatch()
	const { albums: { createModalOpen, albums }, userInfo } = useAppSelector(s => s)
	const onCreate = async ({ title }: { title: string }) => {
		const albumsExist = albums.map(album => album.name).find(albumName => albumName === title)
		if (albumsExist) {
			showWarningNotification("Album with this name exists")
			return
		} else {
			const id = getUniqueId()
			const album = {
				id,
				name: title,
				photos: [],
				circleId: getCircleId() as string,
				userId: userInfo.id
			}
			showSuccessNotification("Album has been created")
			dispatch(addAlbum(album))
			dispatch(setCreateAlbumModalOpen(false))
		}
	}

	return (
		<div>
			<CollectionCreateForm
				open={createModalOpen}
				onCreate={onCreate}
				onCancel={() => {
					dispatch(setCreateAlbumModalOpen(false))
				}}
			/>
		</div>
	)
}