import { JWT } from 'next-auth'
import { NextApiRequest } from 'next'
import axios from 'axios'

export const refreshToken = async (token: JWT, req: NextApiRequest) => {
	try {
		const {
			data: { accessToken }
		} = await axios.get('http://localhost:8000/refresh', {
			headers: req.headers
		})

		return {
			...token,
			accessToken
		}
	} catch (error) {
		throw error
	}
}
