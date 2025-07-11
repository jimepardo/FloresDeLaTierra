import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const ProductDetail = () => {

    const { id } = useParams();

    const { products, load, addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null); 
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (load) {
            setLoadingDetail(true);
            return;
        }

        if (!products || products.length === 0) {
            setProduct(null);
            setLoadingDetail(false);
            return;
        }

        const foundProduct = products.find(p => p.id == (id));
        setProduct(foundProduct);
        setLoadingDetail(false);

        if (foundProduct) {
            setQuantity(foundProduct.stock > 0 ? 0 : 0);
        } else {
            setQuantity(-1);
        }

    }, [id, product, load])

    
    const increase = useCallback(() => {
        if (product && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    }, [quantity, product]);

    const decrease = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    }, [quantity]);

    if (loadingDetail) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando detalles del producto...</div>;
    }

    if (!product) {
        return (
            <div id='main-content-wrapper' style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: '#c00' }}>Detalle del producto: {id}</h1>
                <p style={{ fontSize: '1.2rem' }}>Producto no encontrado</p>
            </div>
        );
    }

    const getPrice = (price) => {
        return price.toLocaleString('es-ES', {
            style: 'decimal',
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return (
        <div id='main-content-wrapper'>
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }} >
                <br />
                <Breadcrumb category={product.category} subcategory={product.subcategory} productName={product.name} />

                <section
                    style={{
                        maxWidth: '600px',
                        margin: '32px auto',
                        padding: '2rem',
                        border: '1px solid #eee',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                        background: '#A3B18A',
                    }}
                >

                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
                        {product.name}
                    </h1>
                    {product.img && (
                        <img
                            src={product.img}
                            alt={product.name}
                            style={{
                                width: '100%',
                                maxHeight: '300px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                            }}
                        />
                    )}
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#555' }}>
                        {product.description}
                    </p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#007b55' }}>
                        Precio: ${getPrice(product.price)}
                    </p>
                    <details style={{ marginBottom: '1.5rem' }}>
                        <summary style={{ fontWeight: 'bold', color: '#333' }}>
                            Detalles del producto
                        </summary>
                        <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
                            <li>Categoría: {product.category}</li>
                            <li>Subcategoría: {product.subcategory}</li>
                            <li>SKU: {product.id ? product.id * 1250 : 'N/A'}</li>
                        </ul>
                    </details>
                    <p style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem' }}>
                        Stock: {product.stock}
                    </p>
                    {product.stock > 0 ? (
                        <>
                            <div className='quantity-container'>
                                <button onClick={decrease} className='qtyButton' disabled={quantity === 1}><HiMinusSm /></button>
                                <span>{quantity}</span>
                                <button onClick={increase} className='qtyButton' disabled={quantity >= product.stock}><HiPlusSm /></button>
                            </div>
                            <div className='d-inline-flex gap-1 mt-3'>
                                <button className='btn btn-add' style={{ display: quantity == 0 ? 'none' : 'block' }} onClick={() => addToCart({ ...product, quantity: quantity })}>Agregar al Carrito</button>
                            </div>
                        </>
                    ) : (
                        <p style={{ color: 'red', fontWeight: 'bold' }}>Sin stock disponible</p>
                    )}&nbsp;
                    <div className='d-inline-flex gap-1 mt-3'>
                        <NavLink className='btn btn-seem link' to="/products" style={{ color: '#DAD7CD' }}>Volver al Inicio</NavLink>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProductDetail;