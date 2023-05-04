import { Form, Input, Modal } from "antd"
import React from "react"
import { Channel } from "types"
import { useDispatch } from "react-redux"
import { addChannel, setActiveChannel, setIsOpenCreateChannelModal } from "store"
import { getUniqueId } from "utils/get-unique-id"
import { useAppSelector } from "hooks/redux"
// import { createChannel } from "api/channel"
import { validationChannelName } from "validation"
import { getCircleId } from "utils/get-circle-id"
import { showSuccessNotification, showWarningNotification } from "components/shared/notification"

type Props = {
	isOpen: boolean
	onCreate: (values: { name: string }) => void
	onCancel: () => void
}

const CollectionCreateForm = (props: Props) => {
	const { onCreate, onCancel, isOpen } = props
	const [form] = Form.useForm()

	return (
		<Modal
			open={isOpen}
			title="Create a new channel"
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
					name="name"
					rules={validationChannelName}
				>
					<Input placeholder="Please input the title of the channel!" />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export const CreateChannelModal = () => {
	const dispatch = useDispatch()
	const { isOpenCreateChannelModal,channels } = useAppSelector(s => s.channels)
	const onCreate = async (values: { name: string }) => {
		const channelExist = channels.map(channel=>channel.name).find(channelName=>channelName===values.name)
		if(channelExist){
			showWarningNotification("Channel with this name exists")
			return
		}else{
			const createdChannel: Channel = { name: values.name, id: getUniqueId(), circleId: getCircleId() as string }
			// await createChannel(createdChannel)
			showSuccessNotification("Channel has been created")
			dispatch(addChannel(createdChannel))
			dispatch(setActiveChannel(createdChannel.id))
			dispatch(setIsOpenCreateChannelModal(false))
		}
	}


	return (
		<div>
			<CollectionCreateForm
				isOpen={isOpenCreateChannelModal}
				onCreate={onCreate}
				onCancel={() => { dispatch(setIsOpenCreateChannelModal(false)) }}
			/>
		</div>
	)
}