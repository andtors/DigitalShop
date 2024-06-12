import { useEffect, useState } from "react"
import api from '../../utils/api'

import './ProductCard.css'

const ProductCard = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {

        api.get('/product').then((response) => {
            setProducts(response.data.products)
        })

        
        
    }, [])
  return (
    
    <div>
        {products.length > 0 && 
            products.map((product) => (
                <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>R$ {product.price}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ProductCard