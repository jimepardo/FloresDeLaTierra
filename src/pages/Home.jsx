import React, { useContext } from 'react';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';

const Home = () => {

    const { load, error } = useContext(CartContext);
    
    if (error) {
        return <NotFound />
    }

    return (
        <div id='main-content-wrapper'>
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}><br/>
                <h1 style={{ color: '#344E41', textAlign: 'center' }}>Bienvenidos a Flores de la Tierra</h1><br/>
                <div className='container-fluid'>
                    {
                        load ? <img className='loading' src={loading} alt="loading" /> : 
                        <ProductList />
                    }

                </div>
            </div>
        </div>
    )
}

export default Home;