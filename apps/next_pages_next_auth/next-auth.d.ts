import NextAuth, { DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		accessToken?: string
		refreshToken?: string
	}

	interface User {
		accessToken?: string
		refreshToken?: string
	}
	interface JWT {
		accessToken?: string
		refreshToken?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		refreshToken?: string
	}
}
