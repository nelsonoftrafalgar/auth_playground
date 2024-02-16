import { JWT } from 'next-auth'
import axios from 'axios'

export const refreshToken = async (token: JWT) => {
	try {
		const {
			data: { accessToken }
		} = await axios.get('http://localhost:8000/refresh', {
			headers: { Cookie: token.refreshToken }
		})

		return {
			...token,
			accessToken
		}
	} catch (error) {
		throw error
	}
}
