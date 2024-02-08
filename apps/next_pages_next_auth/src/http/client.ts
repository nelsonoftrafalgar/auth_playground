import Cookies from 'js-cookie'
import axios from 'axios'

const client = axios.create({
	baseURL: 'http://localhost:8000',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})

client.interceptors.request.use(
	(config) => {
		const accessToken = Cookies.get('accessToken')

		if (!config.headers['Authorization']) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
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
			try {
				const {
					data: { accessToken }
				} = await axios.get('api/refreshToken')
				Cookies.set('accessToken', accessToken)
				prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
				return client(prevRequest)
			} catch {
				Cookies.remove('accessToken')
			}
		}
		return Promise.reject(error)
	}
)

export default client
