import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../store/auth.slice'
import { useNavigate } from 'react-router-dom'

export interface LoginFormData {
	login: string
	password: string
}

export const Login = () => {
	const navigate = useNavigate()
	const { handleSubmit, register } = useForm<LoginFormData>()
	const [login, { isSuccess }] = useLoginMutation()

	const onSubmit = (data: LoginFormData) => {
		login(data)
	}

	if (isSuccess) navigate('/', { replace: true })

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
