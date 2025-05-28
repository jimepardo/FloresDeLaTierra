import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {

    const { id } = useParams();

    const { products } = useContext(CartContext);

    const product = products.find(product => product.id == id); 
    
    return (
        <>
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}><br />
                <h1 style={{ color: '#333', textAlign: 'center' }}>Detalle del producto: {product.id} </h1><br />
                <div className='container-fluid'>
                    {
                        product ? (<h2>{product.name}</h2>) :
                            (<p>Producto no encontrado</p>)
                    }

                </div>
            </div>
        </>
    )
}

export default ProductDetail;