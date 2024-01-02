import { clearAccessToken, setAccessToken } from '../store/auth.slice'

import { refresh } from '../store/auth.thunk'
import { useAppDispatch } from '../store/store'
import { useNavigate } from 'react-router-dom'

export const useRefreshToken = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const refreshToken = async () => {
		try {
			const { accessToken } = await dispatch(refresh()).unwrap()
			dispatch(setAccessToken(accessToken))
		} catch {
			dispatch(clearAccessToken())
			navigate('/login', { replace: true })
		}
	}
	return refreshToken
}
