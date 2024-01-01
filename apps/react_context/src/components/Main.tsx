import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { isAxiosError } from 'axios'
import { useAuth } from '../auth/Auth'
import { useClient } from '../http/useClient'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Main = () => {
	const { setAccessToken } = useAuth()
	const navigate = useNavigate()
	const client = useClient()

	const [data, setData] = useState<string | null>(null)

	const handleLogout = async () => {
		try {
			await client.get('/logout')
			setAccessToken(null)
			navigate('/login', { replace: true })
		} catch (error) {
			setAccessToken(null)
			navigate('/login', { replace: true })
		}
	}

	const handleGetData = async () => {
		try {
			const {
				data: { message }
			} = await client.get('/data')
			setData(message)
		} catch (error) {
			if (isAxiosError(error)) {
				setData(error.response?.data.message)
			}
		}
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
