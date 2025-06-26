import React, { useContext } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {

    const { id } = useParams();

    const { products } = useContext(CartContext);

    const product = products.find(product => product.id == id);

    if (!product) {
        return (
            <div id='main-content-wrapper' style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: '#c00' }}>Detalle del producto: {id}</h1>
                <p style={{ fontSize: '1.2rem' }}>Producto no encontrado</p>
            </div>
        );
    }

    return (
        <div id='main-content-wrapper'>
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
                Precio: ${product.price}
            </p>
            <details style={{ marginBottom: '1.5rem' }}>
                <summary style={{ fontWeight: 'bold', color: '#333' }}>
                    Detalles del producto
                </summary>
                <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
                    <li>Marca: Acme</li>
                    {/* <li>Categoría: {product.category}</li> */}
                    <li>SKU: {product.id * 1250}</li>
                    <li>Fecha de lanzamiento: {new Date().toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}</li>
                </ul>
            </details>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem' }}>
                Stock: {product.stock}
            </p>
            <button className='btn  btn-seem'>
            <NavLink className='link'
                to="/"
                style={{                    
                    color: '#DAD7CD'
                }}
            >
                Volver al Inicio
            </NavLink></button>
        </section>
    </div>
    )
}

export default ProductDetail;