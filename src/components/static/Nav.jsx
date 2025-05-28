import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png"
import Cart from "../Cart";
import "./styles/staticStyles.css";
import { CartContext } from "../../context/CartContext";

function Nav() {

    const { setCartOpen } = useContext(CartContext);

    return (
        <nav style={{ backgroundColor: '#01722f', color: 'white', padding: '10px' }}>
            <ul>
                <img src={logo} style={{ width: '35px', height: '35px' }} />
                <li className='btnLogin'>
                    <Link to='/login' className='link'><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión</Link>
                </li>
                <li><Link to="/"> Inicio</Link></li>
                <li><Link to="/about"> Acerca de</Link></li>
                <li><Link to="/products" >Productos </Link></li>
                <li><Link to="/howto" >Cuidados</Link></li>
                <li><Link to="/contact" > Contacto</Link></li>
                <li className="cartNav">
                    <button className="btnCart" onClick={() => setCartOpen(true)}><i className="fa-solid fa-cart-shopping" style={{ color: "yellow" }}></i></button>
                    <Cart onClose={() => setCartOpen(false)} />
                </li>
                
                <li className='btnAdmin'>
                    <Link to='/admin' className='link'><i className="fa-solid fa-user-tie"></i>Panel Admin</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;