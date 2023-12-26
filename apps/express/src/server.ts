import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

const app = express()
const port = 8000

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
	console.log(req.body)
	res.send('Hello, World!')
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
