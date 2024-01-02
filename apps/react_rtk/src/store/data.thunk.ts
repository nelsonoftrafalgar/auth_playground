import client from '../http/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { setData } from './data.slice'

export const getData = createAsyncThunk('getData', async (_, { dispatch }) => {
	try {
		const {
			data: { message }
		} = await client.get('/data')
		dispatch(setData(message))
	} catch (error) {
		if (isAxiosError(error)) {
			dispatch(setData(error.response?.data.message))
		}
	}
})
