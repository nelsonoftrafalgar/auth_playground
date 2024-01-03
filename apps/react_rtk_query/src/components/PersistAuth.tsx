import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { useAppSelector } from '../store/store'
import { useRefreshQuery } from '../store/auth.slice'

export const PersistAuth = ({ children }: PropsWithChildren) => {
	const { accessToken } = useAppSelector(({ auth }) => auth)
	const { isError } = useRefreshQuery(undefined, { skip: Boolean(accessToken) })

	if (isError) return <Navigate to='/login' replace />

	if (!accessToken) return <p>Loading persist...</p>

	return <>{children}</>
}
