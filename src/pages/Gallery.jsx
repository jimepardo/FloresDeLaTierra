import React, { useContext } from "react";
import ProductList from "../components/ProductList";
import loading from '../assets/loading.gif';
import { CartContext } from "../context/CartContext";


function Gallery() {

    const { products, load, addToCart } = useContext(CartContext);
    
    return (
        <>
        
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }} ><br/>
                <h1 style={{ color: '#333', textAlign: 'center' }}>Listado de Productos</h1><br />
                <div className="container-fluid justify-content-center">
                    {
                        load ? <img src={loading} alt="loading" className="loading" /> :
                            <ProductList products={products} addToCart={addToCart} />

                    }
                </div>
            </div>
        </>
    )
}

export default Gallery;