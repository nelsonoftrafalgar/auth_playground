import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import { useAuth } from '../auth/Auth'
import { useClient } from '../http/useClient'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface LoginFormData {
	login: string
	password: string
}

interface LoginResponse {
	accessToken: string
}

export const Login = () => {
	const { setAccessToken } = useAuth()
	const navigate = useNavigate()
	const client = useClient()
	const { handleSubmit, register } = useForm<LoginFormData>()

	const onSubmit = async (data: LoginFormData) => {
		try {
			const {
				data: { accessToken }
			} = await client.post<LoginResponse>('/login', data)
			setAccessToken(accessToken)
			navigate('/', { replace: true })
		} catch {
			setAccessToken(null)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
