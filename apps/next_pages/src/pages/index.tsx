import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { useState } from 'react'

const Home = () => {
	const [data, setData] = useState<string | null>(null)
	const handleLogout = async () => {}

	const handleGetData = async () => {}
	const color = data?.includes('granted') ? '#2cd08b' : '#f65436'
	return (
		<Card data-testid='main'>
			<Header color={color}>{data}</Header>
			<Button onClick={handleGetData}>Get Data</Button>
			<Button onClick={handleLogout}>LOGOUT</Button>
		</Card>
	)
}
export default Home
