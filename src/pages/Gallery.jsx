import React, { useContext } from "react";
import ProductList from "../components/ProductList";
import loading from '../assets/loading.gif';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Filter from "../components/Filter";

function Gallery() {

    const { load } = useContext(CartContext);

    return (
        <div id='main-content-wrapper' className='container-fluid'>
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }} ><br />
                <h1 style={{ color: '#344E41', textAlign: 'center' }}>Listado de Productos</h1><br />
                <Breadcrumb />
                <br />
                <div className="row"> 
                    {/* Left Sidebar for Filters */}
                    <div className="col-lg-3 col-md-4 d-none d-md-block"> {/* Hidden on small screens, block on medium and up */}
                        <Filter />
                    </div>
                    {/* Main Content Area */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                            {
                                load ? <img src={loading} alt="loading" className="loading" /> :
                                    <ProductList />

                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery;