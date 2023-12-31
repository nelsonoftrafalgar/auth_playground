import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from 'react'

interface AuthContext {
	accessToken: string | null
	setAccessToken: Dispatch<SetStateAction<string | null>>
}

const AuthContext = createContext({} as AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [accessToken, setAccessToken] = useState<string | null>(null)

	return (
		<AuthContext.Provider value={{ accessToken, setAccessToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
