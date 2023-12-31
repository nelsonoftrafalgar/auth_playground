import { client } from './client'
import { useAuth } from '../auth/Auth'
import { useEffect } from 'react'
import { useRefreshToken } from './useRefreshToken'

export const useClient = () => {
	const { accessToken } = useAuth()
	const refreshToken = useRefreshToken()

	useEffect(() => {
		const requestInterceptor = client.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		const responseInterceptor = client.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const accessToken = await refreshToken()
					prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
					return client(prevRequest)
				}
				return Promise.reject(error)
			}
		)

		return () => {
			client.interceptors.request.eject(requestInterceptor)
			client.interceptors.response.eject(responseInterceptor)
		}
	}, [accessToken, refreshToken])

	return client
}
