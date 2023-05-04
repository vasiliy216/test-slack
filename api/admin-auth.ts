export const checkAdminPass = async (password: string) => {
	try {
		const res = await fetch("/api/admin-auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password })
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}