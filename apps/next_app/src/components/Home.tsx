'use client'

import { getData, logout } from '@/app/actions/actions'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
	message?: string
}

export const Home = ({ message }: Props) => {
	const router = useRouter()
	const [data, setData] = useState<string | null>(() => message ?? null)
	const color = data?.includes('granted') ? '#2cd08b' : '#f65436'

	const handleGetData = async () => {
		try {
			const data = await getData()
			setData(data)
		} catch {
			router.replace('/login')
		}
	}

	const handleLogout = async () => {
		await logout()
	}

	return (
		<Card data-testid='main'>
			<Header color={color}>{data}</Header>
			<Button onClick={handleGetData}>Get Data</Button>
			<Button onClick={handleLogout}>LOGOUT</Button>
		</Card>
	)
}
