import React, { useContext, useState } from 'react';
import './styles/Product.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Product = ({ product }) => {

    const { addToCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(product.quantity);

    const increase = () => {
        if(quantity + product.quantity <= product.stock){
            setQuantity( prev => prev + 1 );
        }
    };        
    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    } 

    return (
        <div className='col'>
            <section className='card'>
                <div className=' card-img-top imgContainer'>
                    <img src={product.img} alt={product.name} className='imagen' />
                </div>
                <h3 className='card-title'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
                <p className='product-stock'>Stock: {product.stock} </p>
                <div className='quantity-container'>
                    <button onClick={decrease} className='qtyButton'>-</button>
                    <span>{quantity}</span>
                    <button onClick={increase} className='qtyButton'>+</button>
                </div>
                <div className='d-inline-flex gap-1'>
                    <button className='btn btn-add' style={{display: quantity == 0 ? 'none' : 'block'}} onClick={() => addToCart({ ...product, quantity: quantity })} >Agregar</button>
                    <Link role='button' className='btn btn-seem' to={`/products/${product.id}`}> Ver más</Link>
                </div>
            </section>
        </div>

    );
}

export default Product;