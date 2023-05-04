import { useCallback, useEffect } from "react"
import { useAppDispatch } from "hooks/redux"
import { setCircleUsers } from "store"
import { getCircleUsers } from "api/user"

export const useLoadUsers = async () => {
	const dispatch = useAppDispatch()
	const loadUsersHandle = useCallback(async () => {
		const users = await getCircleUsers()
		dispatch(setCircleUsers(users))
	}, [dispatch])
	useEffect(() => { loadUsersHandle() }, [loadUsersHandle])
}