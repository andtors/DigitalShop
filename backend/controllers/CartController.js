const Cart = require('../models/Cart')
const Product = require('../models/Product')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class  CartController{
    static async addCart(req, res){

        let product
        const productId = req.body.productId
        const quantity = req.body.quantity

        try {
             
            product = await Product.findById(productId)
            
        } catch (error) {
            res.status(401).json({
                message: `Erro: ${error}`
            })
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const productCart = new Cart({
            user: {
                _id: user._id,
                name: user.name
            },
            product: {
                _id: product._id,
                name: product.name,
                price: product.price
            },
            quantity
        })

            try {
            
                const newProductCart = await productCart.save()
    
                res.status(201).json({
                    message: 'Produto inserido no cart!',
                    newProductCart
                })
    
            } catch (error) {
                
                res.status(401).json({
                    message: `Erro: ${error}`
                })
    
                return
            }
    }

    static async getAll(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const productsCart = await Cart.find({'user._id': user._id}).sort('-createdAt')
        
       res.status(200).json({
        message: `Produtos no Cart do ${user.name}`,
        productsCart
       })
    }
}