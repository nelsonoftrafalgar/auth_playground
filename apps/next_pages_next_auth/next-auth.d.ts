import NextAuth, { DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		accessToken?: string
	}

	interface User {
		accessToken?: string
	}
	interface JWT {
		accessToken?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		accessTokenExpiresIn: number
	}
}
