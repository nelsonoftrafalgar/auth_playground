'use client'

import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export interface LoginFormData {
	login: string
	password: string
}

interface LoginResponse {
	accessToken: string
}
export default function Login() {
	const { handleSubmit, register } = useForm<LoginFormData>()
	const router = useRouter()

	const onSubmit = async (data: LoginFormData) => {
		try {
			await axios.post('api/auth/login', data)
			router.replace('/')
		} catch {
			console.log('Login error')
		}
	}
	return (
		<form data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Input
					{...register('login')}
					type='text'
					label='Login'
					placeholder='Login'
				/>
				<Input
					{...register('password')}
					type='password'
					label='Password'
					placeholder='Password'
				/>
				<Button>SIGN IN</Button>
			</Card>
		</form>
	)
}
