import { store } from "store"

export const getCircleId = () => {
	if (store) {
		return store.getState().userInfo.circleId
	}
	return null
}