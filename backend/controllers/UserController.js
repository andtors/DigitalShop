const User = require('../models/User')
const Product = require('../models/Product')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, cpf, address, password, confirmPassword } = req.body
        
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatorio!" })
            return
        }
        

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatorio!" })
            return
        }

        if (!password) {
            res.status(422).json({ message: "A senha é obrigatoria!" })
            return
        }

        if (!confirmPassword) {
            res.status(422).json({ message: "A confirmação de senha é obrigatoria!" })
            return
        }

        if (!cpf) {
            res.status(422).json({ message: "O cpf é obrigatorio!" })
            return
        }

        if (!address) {
            res.status(422).json({ message: "O endereço é obrigatorio!" })
            return
        }

        if (password !== confirmPassword) {
            res.status(422).json({ message: "As senhas não são iguais!" })
            return
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: "Por favor utilize outro e-mail!" })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const createUser = new User({
            name,
            email,
            password: passwordHash,
            cpf,
            address
        })

        try {

            const newUser = await createUser.save()

            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({ message: error })

            return
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ message: "O e-mail é obrigatorio!" })
        }

        if (!password) {
            return res.status(422).json({ message: "A senha é obrigatorio!" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(422).json({ message: "Não há usuários com este e-mail!" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(422).json({ message: "Senha inválida!" })
        }

        await createUserToken(user, req, res)
    }

    static async getUser(req, res) {

        let user

        if (req.headers.authorization) {
            user = await getUserByToken(req)

            user.password = undefined

        } else {
            res.status(401).send({ message: 'Não há usuario logado!' })
        }

        res.status(201).send(user)
    }

    static async addProdToCart(req, res) {

        const productId =  req.body.productId
        
        const user = await getUserByToken(req)
        
        const product = await Product.findById({ _id: productId })

        const producToAdd = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
        }

        const arrayOfProdsId = []

        user.cart.map((p) => {
            arrayOfProdsId.push(String(p._id))
        })

        if(arrayOfProdsId.includes(String(productId))){
            return res.status(401).send({message: 'Produto já inserido no carrinho!'})
        }

        user.cart.push(producToAdd)

        try {

             await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true })

            return res.status(201).send({ message: `Produto ${productId} inserido no cart com sucesso!` })

        } catch (error) {
            return res.status(401).send({ message: error })
        }

    }

    static async removeProdCart(req, res) {

        const productId = req.body.productId

        const user = await getUserByToken(req)

        let arrayOfProds = []

        user.cart.map((p) => {
            arrayOfProds.push(p)

        })

        arrayOfProds = arrayOfProds.filter(p => String(p._id) !== productId)

        user.cart = arrayOfProds

        try {

            await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true })

            return res.status(201).send({ message: `Produto ${productId} removido do cart com sucesso!` })

        } catch (error) {
            return res.status(404).send({ message: error })
        }
    }

    static async editUser(req, res) {

        const id = req.params.id

        const { name, email, password, cpf, address, confirmPassword } = req.body

        const updatedData = {}

        const user = await getUserByToken(req)

        if (!name) {
            return res.status(422).json({ message: "O nome é obrigatorio!" })
        } else {
            updatedData.name = name
        }

        if (!email) {
            return res.status(422).json({ message: "O e-mail é obrigatorio!" })
        }

        const userExists = await User.find({ email: email })

        if (user.email !== email && !userExists) {
            res.status(422).json({
                message: "E-mail já em uso!"
            })
            return
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ message: "As senhas não são iguais!" })
        } else {

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            updatedData.password = passwordHash

        }

        if (!cpf) {
            return res.status(422).json({ message: "O cpf é obrigatorio!" })
        } else {
            updatedData.cpf = cpf
        }

        if (!address) {
            return res.status(422).json({ message: "O endereço é obrigatorio!" })
        } else {
            updatedData.address = address
        }

        try {

            await User.findByIdAndUpdate({ '_id': id }, updatedData)

            return res.status(201).send({ message: 'Usuario atualizado com sucesso!' })

        } catch (error) {
            return res.status(500).send({ message: error })
        }
    }
}
