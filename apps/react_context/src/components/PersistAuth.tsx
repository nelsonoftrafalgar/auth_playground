import { PropsWithChildren, useEffect } from 'react'

import { useAuth } from '../auth/Auth'
import { useRefreshToken } from '../http/useRefreshToken'

export const PersistAuth = ({ children }: PropsWithChildren) => {
	const { accessToken } = useAuth()
	const refreshToken = useRefreshToken()

	useEffect(() => {
		if (!accessToken) {
			refreshToken()
		}
	}, [accessToken, refreshToken])

	if (!accessToken) {
		return <p>Loading...</p>
	}

	return <>{children}</>
}
