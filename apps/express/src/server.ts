import jwt, { Secret } from 'jsonwebtoken'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

require('dotenv').config()

const app = express()
const port = 8000
const corsConfig = {
	origin: true,
	credentials: true
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(bodyParser.json())

app.use(cookieParser())

app.post('/login', (req, res) => {
	const { login } = req.body

	const accessToken = jwt.sign(
		{ login },
		process.env.ACCESS_TOKEN_SECRET as Secret,
		{ expiresIn: '10s' }
	)
	const refreshToken = jwt.sign(
		{ login },
		process.env.REFRESH_TOKEN_SECRET as Secret,
		{ expiresIn: '15s' }
	)
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 15 * 1000
	})
	res.json({ accessToken })
})

app.get('/logout', (_, res) => {
	res.clearCookie('refreshToken', { httpOnly: true })
	res.sendStatus(204)
})

app.get('/refresh', (req, res) => {
	const { refreshToken } = req.cookies

	if (!refreshToken) res.sendStatus(401)

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET as Secret,
		(error: jwt.VerifyErrors | null) => {
			if (error) return res.sendStatus(403)
			const accessToken = jwt.sign(
				{ login: 'login' },
				process.env.ACCESS_TOKEN_SECRET as Secret,
				{ expiresIn: '10s' }
			)

			res.json({ accessToken })
		}
	)
})

app.get('/data', (req, res) => {
	const authHeader = req.headers['authorization']

	if (!authHeader) return res.status(401).json({ message: 'Access denied' })

	const [_, accessToken] = authHeader.split(' ')

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret, (error) => {
		if (error) {
			res.status(403).json({ message: 'Access denied' })
		}
		res.status(200).json({ message: 'Access granted' })
	})
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
