import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
    
    <div className="main-div">
        {products.length > 0 && 
            products.map((product) => (
                <div className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="info-div">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">R$&nbsp;{product.price}</p>
                </div>
                <Link className="more-info"  to={`/product/${product._id}`}>Mais detalhes</Link>
                </div>
            ))
        }
    </div>
  )
}

export default ProductCard