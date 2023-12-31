import axios from 'axios'

export const client = axios.create({
	baseURL: 'http://localhost:8000',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})
