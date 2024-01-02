import { PropsWithChildren, useEffect } from 'react'

import { useAppSelector } from '../store/store'
import { useRefreshToken } from '../http/useRefreshToken'

export const PersistAuth = ({ children }: PropsWithChildren) => {
	const { accessToken } = useAppSelector(({ auth }) => auth)
	const refreshToken = useRefreshToken()

	useEffect(() => {
		if (!accessToken) {
			refreshToken()
		}
	}, [])

	if (!accessToken) {
		return <p>Loading persist...</p>
	}

	return <>{children}</>
}
