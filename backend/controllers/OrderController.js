const Order = require('../models/Order')
const User = require('../models/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class OrderController {
  static async createOrder(req, res) {

    const token = getToken(req)
    const decoded = await getUserByToken(token)

    const user = await User.findById({ _id: decoded.id })

    let arrayOfProds = []

    user.cart.map((p) => {
      arrayOfProds.push(p)
    })

    let arrayOfProdsPrice = []
    let arrayOfProdsQtn = []

    user.cart.map((p) => {
      arrayOfProdsPrice.push(p.price)
      arrayOfProdsQtn.push(p.quantity)
    })

    
    if(arrayOfProdsPrice.length === 0) {
      res.status(401).send({message: 'Não há itens no carrinho!'})
      return
    }

    let totalProdValue = arrayOfProdsPrice.reduce((sum, p) => {
      return sum + p
    })

    const order = new Order({
      totalprice: totalProdValue,
      user: {
        _id: user._id,
        name: user.name,
        product: arrayOfProds
      },
    })

    try {
      
      const newOrder = await order.save()

      while(user.cart.length > 0){
        user.cart.pop()
      }

      await User.findOneAndUpdate(
        {_id: user._id},
        {$set: user},
         { new: true })
      
      res.status(201).json({
        message: 'Ordem criada!',
        newOrder
      })
    } catch (error) {

      res.status(500).json({ message: error })

    }
  }

  static async getAllOrders(req, res) {

    const token = getToken(req)
    const decoded = await getUserByToken(token)
    const user = await User.findById({ _id: decoded.id })

    const orders = await Order.find({ 'user._id': user._id }).lean()

    return res.status(201).send({ orders })
  }

  static async getOrderById(req, res) {
    
    const id = req.params.id

    const token = getToken(req)

    const decoded = await getUserByToken(token)

    const user = await User.findById({ _id: decoded.id })

    const orders = await Order.find({ 'user._id': user._id }).lean()

    const order = orders[`${id}`]

    return res.status(201).send({ order })
  }
}