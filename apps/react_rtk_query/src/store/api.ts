import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { clearAccessToken, setAccessToken } from './auth.slice'

import { AxiosResponse } from 'axios'
import { RefreshResponse } from './types'
import { RootState } from './store'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000',
	prepareHeaders: (headers, { getState }) => {
		const {
			auth: { accessToken }
		} = getState() as RootState
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
		}
		return headers
	}
})

const baseQueryWithRefresh = async (
	args: FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error?.status === 403) {
		try {
			const {
				data: { accessToken }
			} = (await baseQuery(
				{
					url: '/refresh',
					method: 'GET',
					credentials: 'include'
				},
				api,
				extraOptions
			)) as AxiosResponse<RefreshResponse>
			api.dispatch(setAccessToken(accessToken))
			result = await baseQuery(args, api, extraOptions)
		} catch {
			api.dispatch(clearAccessToken())
		}
	}

	return result
}

export const api = createApi({
	baseQuery: baseQueryWithRefresh,
	tagTypes: ['Data'],
	endpoints: () => ({})
})
