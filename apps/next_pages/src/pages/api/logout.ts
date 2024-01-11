import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/http/client'
import { isAxiosError } from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req

	try {
		const { headers: responseHeaders } = await client.get('/logout', {
			headers
		})

		Object.keys(responseHeaders).forEach((key) => {
			if (key === 'set-cookie') {
				res.setHeader(key, [
					...responseHeaders[key]!,
					'accessToken=; Max-Age=0; Path=/;'
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
