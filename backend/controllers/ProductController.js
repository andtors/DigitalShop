const Product = require('../models/Product')

module.exports = class ProductController{
    static async addProduct(req, res){
        const {name, price, quantity, category, description, images} = req.body

        const product = new Product  ({
            name,
            price, 
            category,
            description, 
            images
        })
        
        try {

            await product.save()   
            
            res.status(201).json({message: 'Produto cadastrado!', product})

        } catch (error) {

            res.status(500).json({message: error})

            return

        }
    }

    
}