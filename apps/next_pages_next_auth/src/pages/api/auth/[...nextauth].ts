import NextAuth, { NextAuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import client from '@/http/client'
import { refreshToken } from '@/http/refreshToken'

export const nextAuthOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				login: {},
				password: {}
			},
			authorize: async (credentials) => {
				try {
					const { data, headers } = await client.post('/login', {
						login: credentials?.login,
						password: credentials?.password
					})

					console.log('headers: ', headers)

					const user = {
						id: 'userId',
						accessToken: data.accessToken,
						refreshToken: headers['set-cookie']?.[0]
					}
					if (user) {
						return user
					} else {
						return null
					}
				} catch (error) {
					return null
				}
			}
		})
	],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user && account) {
				return {
					...token,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken
				}
			}

			return await refreshToken(token)
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
			return session
		}
	}
}

export default NextAuth(nextAuthOptions)
