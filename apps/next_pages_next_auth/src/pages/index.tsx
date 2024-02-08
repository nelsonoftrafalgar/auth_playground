import axios, { isAxiosError } from 'axios'
import { getSession, signOut, useSession } from 'next-auth/react'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { GetServerSideProps } from 'next'
import { Header } from '@repo/ui/Header'
import client from '@/http/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
	message?: string
}

const Home = ({ message }: Props) => {
	const { data: session } = useSession()
	const [data, setData] = useState<string | null>(() => message ?? null)

	const router = useRouter()
	const handleLogout = async () => {
		try {
			await axios.get('api/logout')
			signOut({ callbackUrl: '/login' })
		} catch (error) {
			router.replace('/login')
		}
	}

	const handleGetData = async () => {
		try {
			const {
				data: { message }
			} = await client.get('/data', {
				headers: { Authorization: `Bearer ${session?.accessToken}` }
			})
			setData(message)
		} catch (error) {
			if (
				isAxiosError(error) &&
				(error.response?.status === 401 || error.response?.status === 403)
			) {
				signOut({ callbackUrl: '/login' })
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
	try {
		const {
			data: { message }
		} = await client.get('/data', {
			headers: { Authorization: `Bearer ${session.accessToken}` }
		})

		return {
			props: { message }
		}
	} catch (error) {
		if (isAxiosError(error)) {
			return {
				props: { message: error?.response?.data.message ?? null }
			}
		}

		return {
			props: {}
		}
	}
}

export default Home
