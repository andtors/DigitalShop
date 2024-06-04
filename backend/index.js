const express = require('express')
const app = express()

const UserRouter = require('./routes/UserRoutes')
const ProductRouter = require('./routes/ProductRoutes')
const OrderRouter = require('./routes/OrderRoutes')
const CartRouter = require('./routes/CartRoutes')

app.use(express.json())

app.get('/', (req, res) => {
    name = req.body.name

    res.send(`Olá ${name}`)
})

app.use(express.static('public'))

app.use('/user' , UserRouter)
app.use('/product', ProductRouter)
app.use('/order', OrderRouter)
app.use('/cart', CartRouter)

app.listen(3000)