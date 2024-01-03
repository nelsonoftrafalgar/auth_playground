import { AuthState, LoginResponse, RefreshResponse } from './types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LoginFormData } from '../components/Login'
import { api } from './api'

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
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.accessToken = payload.accessToken
			}
		),
			builder.addMatcher(authApi.endpoints.login.matchRejected, (state) => {
				state.accessToken = null
			}),
			builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
				state.accessToken = null
			}),
			builder.addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
				state.accessToken = null
			})
		builder.addMatcher(
			authApi.endpoints.refresh.matchFulfilled,
			(state, { payload }) => {
				state.accessToken = payload.accessToken
			}
		),
			builder.addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
				state.accessToken = null
			})
	}
})

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginFormData>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
				credentials: 'include'
			})
		}),
		logout: builder.query<void, void>({
			query: () => ({
				url: '/logout',
				method: 'GET'
			})
		}),
		refresh: builder.query<RefreshResponse, void>({
			query: () => ({
				url: '/refresh',
				method: 'GET',
				credentials: 'include'
			})
		})
	})
})

export const { useLoginMutation, useLazyLogoutQuery, useRefreshQuery } = authApi

export const { setAccessToken, clearAccessToken } = authSlice.actions

export default authSlice.reducer
