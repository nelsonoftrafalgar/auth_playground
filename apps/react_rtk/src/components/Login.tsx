import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import { login } from '../store/auth.thunk'
import { useAppDispatch } from '../store/store'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export interface LoginFormData {
	login: string
	password: string
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { handleSubmit, register } = useForm<LoginFormData>()

	const onSubmit = async (data: LoginFormData) => {
		dispatch(login(data)).then(() => navigate('/', { replace: true }))
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
