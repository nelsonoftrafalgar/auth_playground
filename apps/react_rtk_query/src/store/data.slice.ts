import { Data } from './types'
import { api } from './api'

export const dataApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getData: builder.query<Data, void>({
			query: () => ({
				url: '/data',
				method: 'GET'
			}),
			providesTags: ['Data']
		})
	})
})

export const { useLazyGetDataQuery } = dataApi
