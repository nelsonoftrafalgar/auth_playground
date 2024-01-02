import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authReducer from './auth.slice'
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './data.slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		data: dataReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
