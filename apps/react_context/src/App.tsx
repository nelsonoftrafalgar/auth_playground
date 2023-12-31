import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './auth/Auth'
import { Login } from './components/Login'
import { Main } from './components/Main'
import { PersistAuth } from './components/PersistAuth'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<PersistAuth>
				<ProtectedRoute>
					<Main />
				</ProtectedRoute>
			</PersistAuth>
		)
	},
	{ path: '/login', element: <Login /> }
])

export const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}
