import axios, { isAxiosError } from 'axios'
import { useAppDispatch, useAppSelector, wrapper } from '@/store/store'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Header } from '@repo/ui/Header'
import client from '@/http/client'
import { jwtVerify } from 'jose'
import { setData } from '@/store/data.slice'
import { useRouter } from 'next/router'

const Home = () => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector(({ data }) => data)

	const router = useRouter()
	const handleLogout = async () => {
		try {
			await axios.get('api/logout')
			router.replace('/login')
		} catch (error) {
			router.replace('/login')
		}
	}

	const handleGetData = async () => {
		try {
			const {
				data: { message }
			} = await client.get('/data')
			dispatch(setData(message))
		} catch (error) {
			if (
				isAxiosError(error) &&
				(error.response?.status === 401 || error.response?.status === 403)
			) {
				router.replace('/login')
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

const verifyToken = async (accessToken: string) => {
	try {
		await jwtVerify(
			accessToken,
			new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
		)
		return true
	} catch {
		return false
	}
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req }) => {
			const accessToken = req.cookies.accessToken
			const isTokenValid = await verifyToken(accessToken ?? '')

			if (!isTokenValid) {
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
				} = await client
					.get('/data', {
						headers: { Authorization: `Bearer ${accessToken}` }
					})
					.catch()

				store.dispatch(setData(message))
			} catch {
				store.dispatch(setData('Access denied'))
			}

			return {
				props: {}
			}
		}
)

export default Home
