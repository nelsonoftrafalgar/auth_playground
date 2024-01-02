import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DataState {
	data: string | null
}

const initialState: DataState = {
	data: null
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData: (state, { payload }: PayloadAction<string>) => {
			state.data = payload
		}
	}
})

export const { setData } = dataSlice.actions

export default dataSlice.reducer
