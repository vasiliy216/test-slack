import { store } from "store"

export const getUserSkeleton = () => ({
	id: "111",
	circleId: "unknown",
	avatar: "unknown",
	firstName: "unknown",
	lastName: "unknown",
	email: "unknown",
	password: "unknown"
})

export const getUserById = (id: string) => {
	const { users, userInfo } = store.getState()
	const user = users.map(u => u.id === userInfo.id ? userInfo : u).find(user => user.id === id)
	if (user) { return user }
	return getUserSkeleton()
}