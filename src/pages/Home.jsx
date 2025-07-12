import React, { useContext } from 'react';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import logo from '/logo-mini.svg';
import Product from '../components/Product';

const Home = () => {

    const { load, error, products } = useContext(CartContext);

    if (error) {
        return <NotFound />
    }

    const productsWithMostStock = [...products].sort((a, b) => b.stock - a.stock).slice(0, 8);

    return (
        <div id='main-content-wrapper'>
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}><br />
                <div className='container-fluid'>
                    {
                        load ? <img className='loading' src={loading} alt="loading" /> : (
                            <>
                                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center main-title">
                                    <div className="col-md-6 p-lg-5 mx-auto my-5">
                                        <h1 className="display-3 fw-bold" style={{ color: '#344E41', textAlign: 'center' }}>Bienvenidos a Flores de la Tierra   <img src={logo} alt="logo" className='logo' /></h1>
                                        <h3 className="fw-normal text-muted mb-3" style={{ color: '#344E41', textAlign: 'center' }}>Fácil, rápido y al alcance de tu mano</h3>
                                        <div className="d-flex gap-3 justify-content-center lead fw-normal">
                                            <NavLink className="icon-link" to="/about">Acerca de nosotros<FiChevronRight />
                                            </NavLink>
                                            <NavLink className="icon-link" to="/products"> Ver todos los productos<FiChevronRight />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <section>
                                    <h1 style={{ textAlign: 'center', color: '#344E41' }}>Productos Destacados</h1><br />
                                    <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                                        {productsWithMostStock.length > 0 ? (
                                            productsWithMostStock.map(product => (
                                                <Product key={product.id} product={product} />
                                            ))
                                        ) : (
                                            <p style={{ textAlign: 'center', color: '#344E41' }}>No hay productos disponibles</p>
                                        )

                                        }
                                    </div>
                                </section>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Home;