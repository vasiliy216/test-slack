/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { deleteChannel, setActiveChannel, setIsOpenChannelInfoModal } from "store"
import { UserList } from "./user-list"

export const ChannelInfo = () => {
	const { activeChannel, isOpenChannelInfoModal } = useAppSelector(s => s.channels)
	const dispatch = useAppDispatch()

	if (!activeChannel) { return null }

	const openInfoModal = () => { dispatch(setIsOpenChannelInfoModal(true)) }
	const closeInfoModal = () => { dispatch(setIsOpenChannelInfoModal(false)) }
	const handlerDeleteChannel = async () => {
		dispatch(deleteChannel(activeChannel.id))
		dispatch(setActiveChannel(null))
	}
	return (
		<div>
			<Button onClick={openInfoModal} type="link">{activeChannel.name}</Button>
			<Modal
				title={activeChannel.name}
				open={isOpenChannelInfoModal}
				onCancel={closeInfoModal}
				footer={[]}
			>
				<UserList />
				<Button danger type="link" >Delete Channel</Button>
				{/* customer wanted to disable it */}
				{/* <Button danger type="link" onClick={handlerDeleteChannel}>Delete Channel</Button>  */} 
			</Modal>
		</div >
	)
}