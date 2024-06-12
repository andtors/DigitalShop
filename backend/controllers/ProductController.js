const Product = require('../models/Product')

module.exports = class ProductController{
    static async addProduct(req, res){
        const {name, price, category, description, image} = req.body

        if(!name){
            return res.status(500).json({message: "O nome é obrigatorio!"})
        }

        if(!price){
            return res.status(500).json({message: "O preço é obrigatorio!"})
        }

        if(!category){
            return res.status(500).json({message: "A categoria é obrigatorio!"})
        }

        if(!description){
            return res.status(500).json({message: "A descrição é obrigatorio!"})
        }

        if(!image){
            return res.status(500).json({message: "A imagem é obrigatorio!"})
        }

        const product = new Product  ({
            name,
            price, 
            category,
            description, 
            image,
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

    static async editProduct(req, res){
        const id = req.params.id
        const {name, price, category, description, image} = req.body

        const updatedData = {}

        if(!name){
            return res.status(500).json({message: "O nome é obrigatorio!"})
        } else {
            updatedData.name = name
        }

        if(!price){
            return res.status(500).json({message: "O preço é obrigatorio!"})
        } else {
            updatedData.price = price
        }

        if(!category){
            return res.status(500).json({message: "A categoria é obrigatorio!"})
        } else {
            updatedData.category = category
        }

        if(!description){
            return res.status(500).json({message: "A descrição é obrigatorio!"})
        } else {
            updatedData.description = description
        }

        if(!image){
            return res.status(500).json({message: "A imagem é obrigatorio!"})
        } else {
            updatedData.image = image
        }

        try {

            const updatedProduct = await Product.findByIdAndUpdate({'_id': id}, updatedData)
            return res.status(201).send({message: "Produto atualizado com sucesso!", updatedProduct})
            
        } catch (error) {
            return res.status(401).send({message: error})
        }
       



    }
}