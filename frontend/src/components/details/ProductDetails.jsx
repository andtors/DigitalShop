import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'

import api from '../../utils/api'

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const {id} = useParams()
    
    useEffect(() => {
        api.get(`/product/${id}`).then((response) => {
           setProduct(response.data.product)
           console.log(product)
        })
    
    }, [])
    
  return (
    <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <h2>R$ {product.price}</h2>
        <p>{product.description}</p>
        <p>Categoria: {product.category}</p>
        <button>Comprar!</button>
    </div>
  )
}

export default ProductDetails