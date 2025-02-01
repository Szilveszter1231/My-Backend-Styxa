import express from 'express'
import { creatCities } from './db/cities.js'
import { createUsers } from './db/user.js'
import { createPoi } from './db/pointofinterest.js'
import { citiesRouter } from './routes/cities.js'
import { poiRouter } from './routes/pointofinterest.js'
import { userRouter } from './routes/user.js'
import { loginRouter } from './routes/auth.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

const port = 3001
server.use(cors())
server.use(bodyParser.json())

server.use(morgan('dev'))

server.use('/cities', citiesRouter)
server.use('/poi', poiRouter)
server.use('/users', userRouter)
server.use('/login', loginRouter)

server.patch('/orszag', (req, res) => {
  res.send('orszag world ez az elso projektem')
})

server.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} cimen`)
  creatCities()
  createUsers()
  createPoi()
  console.log('Database tables created')
})
