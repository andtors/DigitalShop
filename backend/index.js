const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.BC_PORT

const UserRouter = require('./routes/UserRoutes')
const ProductRouter = require('./routes/ProductRoutes')
const OrderRouter = require('./routes/OrderRoutes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors({credentials: true, origin:'http://localhost:5173'}))

app.use('/user' , UserRouter)
app.use('/product', ProductRouter)
app.use('/order', OrderRouter)

app.listen(`${port}`)