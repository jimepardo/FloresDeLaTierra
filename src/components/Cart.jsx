import React, { useContext } from 'react';
import './styles/Style.css';
import { CartContext } from '../context/CartContext';

const Cart = ({ onClose }) => {

    const { emptyCart, cartItems, isCartOpen, deleteProduct, buy } = useContext(CartContext);

    return (
        <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} >
            <div className='cart-header'>
                <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
                <button onClick={onClose} className='close-button'>✕</button>
            </div>
            <div className='cart-content'>
                {cartItems.length === 0 ?
                    (<p style={{ color: 'black' }}>El carrito esta vacio </p>) :
                    (<>
                        <ul className='cart-items'>
                            {cartItems.map((item, index) => (
                                <li key={item.id} className='text-dark cart-item'>
                                    <span>  {item.name} - ${item.price} - Cantidad: {item.quantity} </span>
                                    <button className='' onClick={() => deleteProduct(item)}><i className="fa-solid fa-trash" style={{ color: "#344E41" }}></i></button>
                                </li>
                            ))}
                        </ul>
                        <button className='btn btn-emp' onClick={() => emptyCart()}>Vaciar Carrito</button>
                        <div className='cart-footer'>
                            <p style={{ color: '#344E41' }}>
                                Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                            <button className='btn btn-fin' onClick={()=> buy()}>Finalizar Compra</button>
                        </div>
                    </>
                    )}
            </div>
        </div>
    );
};

export default Cart;