import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from './components/Login'
import { Main } from './components/Main'
import { PersistAuth } from './components/PersistAuth'
import ProtectedRoute from './components/ProtectedRoute'
import { Provider } from 'react-redux'
import { store } from './store/store'

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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}
