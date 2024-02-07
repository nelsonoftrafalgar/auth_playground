import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import client from '@/http/client'

export const nextAuthOptions = (res: NextApiResponse): NextAuthOptions => {
	return {
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

						Object.keys(headers).forEach((key) => {
							if (key === 'set-cookie') {
								res.setHeader(key, [
									...headers[key]!,
									`accessToken=${data.accessToken}; Max-Age=10; Path=/;`
								])
							} else {
								res.setHeader(key, headers[key])
							}
						})

						const user = { id: 'userId', accessToken: data.accessToken }
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
			async jwt({ token, user }) {
				if (user) {
					token.accessToken = user.accessToken
				}

				return token
			},
			async session({ session, token }) {
				session.accessToken = token.accessToken
				return session
			}
		}
	}
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, nextAuthOptions(res))
}
