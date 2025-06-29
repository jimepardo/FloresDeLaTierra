import React, { useContext } from "react";
import ProductList from "../components/ProductList";
import loading from '../assets/loading.gif';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Gallery() {

    const { load } = useContext(CartContext);

    return (
        <div id='main-content-wrapper'>

            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }} ><br />

                <h1 style={{ color: '#344E41', textAlign: 'center' }}>Listado de Productos</h1><br />
                <div className="container-fluid justify-content-center">
                    <nav aria-label="breadcrumb" className='container-fluid'>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                            <li className="breadcrumb-item active"><Link to="/products">Productos</Link></li>
                        </ol>
                    </nav>
                    {
                        load ? <img src={loading} alt="loading" className="loading" /> :
                            <ProductList />

                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery;