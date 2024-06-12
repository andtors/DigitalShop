const Product = require('../models/Product')

module.exports = class ProductController{
    static async addProduct(req, res){
        const {name, price, quantity, category, description, images} = req.body

        const product = new Product  ({
            name,
            price, 
            category,
            description, 
            images,
            quantity
        })
        
        try {

            await product.save()   
            
            res.status(201).json({message: 'Produto cadastrado!', product})

        } catch (error) {

            res.status(500).json({message: error})

            return

        }
    }

    static async removeProduct(req, res){

        const id = req.body.id

        const product = Product.findById(id)

        try {
            
            await product.deleteOne({'_id': id})

            return res.status(201).send({message: 'Produto deletado com sucesso!'})

        } catch (error) {
            return res.status(401).send({message: error})
        }
    }

    static async getAllProducts(req, res) {
        
        const products = await Product.find()

        return res.status(201).send({ products })
        
    }
    
    static async getProductById(req, res) {

        const id = req.params.id

        try {
            
            const product = await Product.findById({'_id': id})

            return res.status(201).send({product})

        } catch (error) {
            return res.status(401).send({message: "Produto não encontrado!"})
        }

    }
}