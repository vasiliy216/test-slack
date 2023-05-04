import { NextApiRequest, NextApiResponse } from "next"

const { API_URL, X_API_KEY } = process.env

type Params = {
	method?: string
	body?: string
	headers?: {
		[key: string]: string
	}
	apiKey?: boolean
}

export const apiCallSocket = async (req: NextApiRequest, res: NextApiResponse, sql: string) => {
	const params: Params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-API-KEY": X_API_KEY as string
		},
		body: JSON.stringify({ sql })
	}
	console.log("sql", sql)
	return await fetch(API_URL as string, params).then(response => response.json())
}
