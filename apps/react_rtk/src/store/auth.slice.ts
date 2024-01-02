import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
	accessToken: string | null
}

const initialState: AuthState = {
	accessToken: null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, { payload }: PayloadAction<string>) => {
			state.accessToken = payload
		},
		clearAccessToken: (state) => {
			state.accessToken = null
		}
	}
})

export const { setAccessToken, clearAccessToken } = authSlice.actions

export default authSlice.reducer
