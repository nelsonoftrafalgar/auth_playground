import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/http/client'
import { isAxiosError } from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req
	try {
		const { data, headers: responseHeaders } = await client.get('/refresh', {
			headers
		})

		Object.keys(responseHeaders).forEach((key) => {
			res.setHeader(key, responseHeaders[key])
		})
		res.status(200).json(data)
	} catch (error) {
		if (isAxiosError(error)) {
			res.status(error.response?.status!).json({})
		}
	}
}
