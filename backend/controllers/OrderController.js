const Order = require('../models/Order')
const User = require('../models/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class OrderController {
  static async createOrder(req, res) {

    const user = await getUserByToken(req)

    const arrayOfProds = []
    
    user.cart.map((p) => {
      arrayOfProds.push(p)
    })

    let arrayOfProdsPrice = []

    user.cart.map((p) => {
      arrayOfProdsPrice.push(p.price)
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
        product: arrayOfProds,
        address: user.address
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

    const user = await getUserByToken(req)

    const orders = await Order.find({ 'user._id': user._id })

    return res.status(201).send({ orders })
  }

  static async getOrderById(req, res) {
    
    const id = req.params.id

    const user = await getUserByToken(req)

    const orders = await Order.find({ 'user._id': user._id })

    const order = await orders[`${id}`]

    return res.status(201).send({ order })
  }
}