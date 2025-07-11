import React, { useCallback, useContext, useState } from 'react';
import './styles/Product.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

const Product = ({ product }) => {

    const { addToCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(product.quantity);

    const increase = useCallback(() => {
        if (product && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    }, [quantity, product]);

    const decrease = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    }, [quantity]);

    const getPrice = (price) => {
        return price.toLocaleString('es-ES', {
            style: 'decimal',
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return (
        <div className='col'>
            <section className='card'>
                <div className=' card-img-top imgContainer'>
                    <img src={product.img} alt={product.name} className='imagen' />
                </div>
                <h3 className='card-title'>{product.name}</h3>
                <p className='product-price'>${getPrice(product.price)}</p>
                <p className='product-stock'>Stock: {product.stock} </p>
                {product.stock > 0 ? (
                    <>
                        <div className='quantity-container'>
                            <button onClick={decrease} className='qtyButton' disabled={quantity === 1}><HiMinusSm /></button>
                            <span>{quantity}</span>
                            <button onClick={increase} className='qtyButton' disabled={quantity >= product.stock}><HiPlusSm /></button>
                        </div>
                        <div className='d-inline-flex gap-1'>
                            <button className='btn btn-add' style={{ display: quantity == 0 ? 'none' : 'block' }} onClick={() => addToCart({ ...product, quantity: quantity })} >Agregar</button>
                            <Link role='button' className='btn btn-seem' to={`/product/${product.id}`}> Ver más</Link>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Sin stock disponible</p>
                )}
            </section>
        </div>

    );
}

export default Product;