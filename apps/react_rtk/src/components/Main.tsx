import { useAppDispatch, useAppSelector } from '../store/store'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { getData } from '../store/data.thunk'
import { logout } from '../store/auth.thunk'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector(({ data }) => data)
	const navigate = useNavigate()

	const handleLogout = async () => {
		dispatch(logout()).finally(() => navigate('/login', { replace: true }))
	}

	const handleGetData = async () => {
		dispatch(getData())
	}

	const color = data?.includes('granted') ? '#2cd08b' : '#f65436'

	return (
		<Card data-testid='main'>
			<Header color={color}>{data}</Header>
			<Button onClick={handleGetData}>Get Data</Button>
			<Button onClick={handleLogout}>LOGOUT</Button>
		</Card>
	)
}
