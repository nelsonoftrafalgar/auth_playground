import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { createWrapper } from 'next-redux-wrapper'
import dataReducer from './data.slice'

export const rootReducer = combineReducers({
	data: dataReducer
})

export const makeStore = () => configureStore({ reducer: rootReducer })
const store = makeStore()

export const wrapper = createWrapper(() => store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
