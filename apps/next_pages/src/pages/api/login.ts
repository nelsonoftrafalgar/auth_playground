import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/http/client'
import { isAxiosError } from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers, body } = req

	try {
		const { data, headers: responseHeaders } = await client.post('/login', body, {
			headers
		})

		Object.keys(responseHeaders).forEach((key) => {
			if (key === 'set-cookie') {
				res.setHeader(key, [
					...responseHeaders[key]!,
					`accessToken=${data.accessToken}; Max-Age=10; Path=/;`
				])
			} else {
				res.setHeader(key, responseHeaders[key])
			}
		})
		res.status(200).json({})
	} catch (error) {
		if (isAxiosError(error)) {
			res.status(error.response?.status!).json(error.response?.data)
		} else {
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
