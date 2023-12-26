import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from './components/Login'
import { Main } from './components/Main'

const router = createBrowserRouter([
	{ path: '/', element: <Main /> },
	{ path: '/login', element: <Login /> }
])

export function App() {
	return <RouterProvider router={router} />
}
