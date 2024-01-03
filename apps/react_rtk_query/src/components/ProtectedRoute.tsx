import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { useAppSelector } from '../store/store'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
	const { accessToken } = useAppSelector(({ auth }) => auth)

	if (!accessToken) return <Navigate to='/login' replace />

	return <>{children}</>
}

export default ProtectedRoute
