import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { useLazyGetDataQuery } from '../store/data.slice'
import { useLazyLogoutQuery } from '../store/auth.slice'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
	const [getData, { data }] = useLazyGetDataQuery()
	const [logout, { isError, isSuccess }] = useLazyLogoutQuery()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
	}

	const handleGetData = () => {
		getData()
	}

	if (isError || isSuccess) navigate('/login', { replace: true })

	const color = data?.message.includes('granted') ? '#2cd08b' : '#f65436'

	return (
		<Card data-testid='main'>
			<Header color={color}>{data?.message}</Header>
			<Button onClick={handleGetData}>Get Data</Button>
			<Button onClick={handleLogout}>LOGOUT</Button>
		</Card>
	)
}
