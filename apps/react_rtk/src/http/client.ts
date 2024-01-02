import axios from 'axios'
import { setAccessToken } from '../store/auth.slice'
import { store } from '../store/store'

const client = axios.create({
	baseURL: 'http://localhost:8000',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})

client.interceptors.request.use(
	(config) => {
		const {
			auth: { accessToken }
		} = store.getState()
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
				} = await client.get('/refresh')
				store.dispatch(setAccessToken(accessToken))
				prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
				return client(prevRequest)
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default client
