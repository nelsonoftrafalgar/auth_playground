import { Button } from '@repo/ui/Button'
import { Card } from '@repo/ui/Card'
import { Input } from '@repo/ui/Input'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

interface LoginFormData {
	login: string
	password: string
}

const Login = () => {
	const router = useRouter()
	const { handleSubmit, register } = useForm<LoginFormData>()

	const onSubmit = async ({ password, login }: LoginFormData) => {
		await signIn('credentials', {
			redirect: false,
			login,
			password
		})
		router.replace('/')
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

export default Login
