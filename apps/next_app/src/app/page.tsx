'use client'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { useState } from 'react'

interface Props {
	message?: string
}

export default function Home({ message }: Props) {
	const [data, setData] = useState<string | null>(() => message ?? null)
	const color = data?.includes('granted') ? '#2cd08b' : '#f65436'

	const handleGetData = () => {}
	const handleLogout = () => {}
	return (
		<Card data-testid='main'>
			<Header color={color}>{data}</Header>
			<Button onClick={handleGetData}>Get Data</Button>
			<Button onClick={handleLogout}>LOGOUT</Button>
		</Card>
	)
}
