import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.MODE === 'dev') app.use(morgan('dev'))

app.get('/', (req, res) => res.send('welcome to cloud storage API'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))



