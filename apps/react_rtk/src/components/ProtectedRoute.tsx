import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { useAuth } from '../auth/Auth'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
	const { accessToken } = useAuth()

	if (!accessToken) {
		return <Navigate to='/login' replace />
	}

	return <>{children}</>
}

export default ProtectedRoute
