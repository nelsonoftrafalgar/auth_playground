import { clearAccessToken, setAccessToken } from './auth.slice'

import { LoginFormData } from '../components/Login'
import client from '../http/client'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface LoginResponse {
	accessToken: string
}

type RefreshResponse = LoginResponse

export const login = createAsyncThunk<void, LoginFormData>(
	'login',
	async (data, { dispatch }) => {
		try {
			const {
				data: { accessToken }
			} = await client.post<LoginResponse>('/login', data)
			dispatch(setAccessToken(accessToken))
		} catch {
			dispatch(clearAccessToken())
		}
	}
)

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
	try {
		await client.get('/logout')
		dispatch(clearAccessToken())
	} catch {
		dispatch(clearAccessToken())
	}
})

export const refresh = createAsyncThunk<RefreshResponse>(
	'refresh',
	async () => {
		const { data } = await client.get('/refresh')
		return data
	}
)
