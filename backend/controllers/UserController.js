const User = require('../models/User')
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController{
    static async register(req, res){
        const {name, email, password, cpf} = req.body

        const user = new User({
            name, 
            email,
            password,
            cpf
        })
        
        try {

            const newUser = await user.save()     
            
            await createUserToken(newUser, req, res)
            
            res.status(201).json({message: 'Usuario criado com sucesso!'})

        } catch (error) {
            res.status(500).json({message: error})
            
            return
        }
    }

    static async login(req, res){
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        const checkPassword = await User.findOne({password: password})

        if(!user && !checkPassword){
            res.status(401).json({message: 'Erro! Login ou senha invalidas!'})
        }

        await createUserToken(user, req, res)
    }

    static async getUser(req, res){
       
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'digitalshop')

            currentUser = await User.findById({_id: decoded.id})

            currentUser.password = undefined
        
        } else {
            currentUser = null
        }

        res.status(201).send(currentUser)
    }

    static async addProdToCart(req, res){
        
        const productId = req.body.productId

        const token = getToken(req)
        const decoded = jwt.verify(token, 'digitalshop')

        const currentUser = await User.findById({_id: decoded.id})

        const product = await Product.findById({_id: productId})

        const producToAdd = {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }

        currentUser.cart.push(producToAdd)
        console.log(currentUser)
        try {
            
            await User.findOneAndUpdate(
              {_id: currentUser._id},
              {$set: currentUser},
               { new: true })

            return res.status(201).send({message: `Produto ${productId} inserido no cart com sucesso!`})

        } catch (error) {
            return res.status(401).send({message: error})
        }
        
    }

    
}
