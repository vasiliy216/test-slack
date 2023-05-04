import { useCallback, useEffect } from "react"
import { useAppDispatch } from "hooks/redux"
import { setCircle, setUserInfo } from "store"
import { getUser } from "api/user"

export const useLoadUserInfo = async (email: string) => {
	const dispatch = useAppDispatch()
	const loadUserInfoHandle = useCallback(async () => {
		if (email) {
			const [userInfo] = await getUser({ email })
			if (userInfo) {
				dispatch(setCircle({ id: userInfo.circleId, passCode: "" }))
				dispatch(setUserInfo(userInfo))
			}
		}
	}, [dispatch, email])
	useEffect(() => { loadUserInfoHandle() }, [loadUserInfoHandle])
}