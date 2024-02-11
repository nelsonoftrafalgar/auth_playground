'use server'

import client from '@/http/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getData() {
	try {
		const {
			data: { message }
		} = await client.get('/data')

		return message
	} catch (e) {
		redirect('/login')
	}
}

export async function logout() {
	const cookieStore = cookies()
	cookieStore.delete('accessToken')
	cookieStore.delete('refreshToken')
	redirect('/login')
}
