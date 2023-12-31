import { client } from './client'
import { useAuth } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'

export const useRefreshToken = () => {
	const { setAccessToken } = useAuth()
	const navigate = useNavigate()

	const refreshToken = async () => {
		try {
			const {
				data: { accessToken }
			} = await client.get('/refresh')
			setAccessToken(accessToken)
			return accessToken
		} catch (error) {
			navigate('/login', { replace: true })
			return null
		}
	}
	return refreshToken
}
