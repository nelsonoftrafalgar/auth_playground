import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import axios from 'axios'
import { useForm } from 'react-hook-form'

interface LoginFormData {
	login: string
	password: string
}

export const Login = () => {
	const { handleSubmit, register } = useForm<LoginFormData>()

	const onSubmit = (data: LoginFormData) => {
		axios.post('http://localhost:8000/login', data)
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
