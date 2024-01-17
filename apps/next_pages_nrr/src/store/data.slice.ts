import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'

import { HYDRATE } from 'next-redux-wrapper'

const getTypedHydrate = <PayloadType>() => createAction<PayloadType>(HYDRATE)

interface DataState {
	data: string | null
}

const initialState: DataState = {
	data: null
}

const DATA_HYDRATE = getTypedHydrate<{ data: DataState }>()

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData: (state, { payload }: PayloadAction<string>) => {
			state.data = payload
		}
	},
	extraReducers: (builder) =>
		builder.addCase(DATA_HYDRATE, (state, action) => ({
			...state,
			...action.payload.data
		}))
})

export const { setData } = dataSlice.actions

export default dataSlice.reducer
