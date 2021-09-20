import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import uploadRoutes from './router/uploadRoutes.js'
import downloadRoutes from './router/downloadRoutes.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.MODE === 'dev') app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('uploads'))

app.get('/', (req, res) => res.send('welcome to cloud storage API'))
app.use('/api/upload', uploadRoutes)
app.use('/api/download', downloadRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))



