import client from '../http/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setData } from './data.slice'

export const getData = createAsyncThunk('getData', async (_, { dispatch }) => {
	const {
		data: { message }
	} = await client.get('/data')
	dispatch(setData(message))
})
