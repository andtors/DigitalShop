const Order = require('../models/Order')
const User = require('../models/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class OrderController {
  static async createOrder(req, res) {

    const token = getToken(req)
    const decoded = await getUserByToken(token)

    const user = await User.findById({_id: decoded.id})  

    let arrayOfProds = []

    user.cart.map((p) => {
      arrayOfProds.push(p)
    })

    let arrayOfProdsPrice = []

    user.cart.map((p) => {
      arrayOfProdsPrice.push(p.price) 
    })

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

      res.status(201).json({
        message: 'Ordem criada!',
        newOrder
      })
    } catch (error) {

      res.status(500).json({ message: error })

    }
  }
  static async getOrders(req, res) {

    let order

    const token = getToken(req)
    const decoded = await getUserByToken(token)
    const user = await User.findById({_id : decoded.id})

    order = await Order.find({'user._id': user._id}).lean()
  
    console.log(order[0].user.product[0])
    
    return res.status(201).send({message: 'rota'})
  }
}