import { useCallback, useEffect } from "react"
import { getChannels } from "api/channel"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { setChannels, setActiveChannel } from "store"
import { Channel } from "types"
// import { getSocket } from "utils/get-socket"

export const useLoadChannels = async () => {
	const { id: circleId } = useAppSelector(s => s.circle)
	const { activeChannel } = useAppSelector(s => s.channels)

	const dispatch = useAppDispatch()
	const loadChannelsHandle = useCallback(async () => {

		const channels = await getChannels()
		dispatch(setChannels(channels))

	}, [dispatch])

	// useEffect(() => {
	// 	getSocket().emit("joinCircle", circleId)
	// }, [circleId])

	useEffect(() => {
		loadChannelsHandle()
	}, [loadChannelsHandle])

	// useEffect(() => {
	// 	getSocket().on("updateChannels", () => {
	// 		getSocket().emit("getChannelsByCircle", circleId)
	// 	}
	// 	)
	// 	getSocket().on("receiveChannelsFromCirce", (channels: Channel[]) => {
	// 		if (activeChannel && !channels.map(chanel => chanel.id).includes(activeChannel.id)) {
	// 			dispatch(setActiveChannel(null))
	// 		}
	// 		dispatch(setChannels(channels))
	// 	})
	// }, [activeChannel, circleId, dispatch])
}
