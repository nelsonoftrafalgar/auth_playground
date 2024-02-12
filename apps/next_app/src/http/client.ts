import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const client = axios.create({
	baseURL: 'http://localhost:8000',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})

client.interceptors.request.use(
	(config) => {
		const cookieStore = cookies()
		const accessToken = cookieStore.get('accessToken')

		config.headers['Authorization'] = `Bearer ${accessToken?.value}`
		return config
	},
	(error) => Promise.reject(error)
)

client.interceptors.response.use(
	(response) => response,
	async (error) => {
		const prevRequest = error?.config
		if (error?.response?.status === 403 && !prevRequest?.sent) {
			prevRequest.sent = true
			const cookieStore = cookies()
			try {
				const {
					data: { accessToken }
				} = await axios.get('http://localhost:8000/refresh', {
					withCredentials: true,
					headers: { Cookie: cookieStore.get('refreshToken')?.value }
				})
				cookieStore.set('accessToken', accessToken)
				prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
				return client(prevRequest)
			} catch (e) {
				cookieStore.delete('accessToken')
				cookieStore.delete('refreshToken')
			}
		}
		return Promise.reject(error)
	}
)

export default client
