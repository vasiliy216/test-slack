import { NextApiRequest, NextApiResponse } from "next"

const { API_URL, X_API_KEY } = process.env

type Params = {
	method?: string
	body?: string
	headers?: {
		[key: string]: string
	},
	apiKey?: boolean
}

export const apiCallWrap = async (req: NextApiRequest, res: NextApiResponse, sql: string) => {
	const params: Params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-API-KEY": X_API_KEY as string
		}
	}
	params.body = JSON.stringify({ sql })
	console.log("sql",sql)
	const response = await fetch(API_URL as string, params)
	try {
		if (response) {
			const result = await response.json()
			res.status(response.status).json(result)
		} else {
			res.status(500)
		}
	} catch (e) {
		console.log("error", e)
		res.status(500).json({ error: (e as Error).message })
	}
}