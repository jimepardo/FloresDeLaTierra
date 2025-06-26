import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"
import Cart from "../Cart";
import "./styles/staticStyles.css";
import { CartContext } from "../../context/CartContext";

function Header() {

    const { isCartOpen, setCartOpen } = useContext(CartContext);

    return (
        <header>
            <nav className="navbar navbar-expand-md fixed-top" style={{ backgroundColor: '#A3B18A' }}>
                <div className="container-fluid" >
                    <NavLink className='link' to="/">
                        <img className="navbar-brand" src={logo} style={{ width: '60%', height: '30%' }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className='link nav-link' to="/"> INICIO </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='link nav-link' to="/about"> ACERCA DE </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='link nav-link' to="/products" >PRODUCTOS </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='link nav-link' to="/howto" > CUIDADOS </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='link nav-link' to="/contact" > CONTACTO </NavLink>
                            </li>
                            <li className="cartNav nav-item">
                                <button className="btnCart btn-link nav-link " onClick={() => setCartOpen(true)}><i className="fa-solid fa-cart-shopping"></i></button>
                                <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-sm btnSession">
                                    <NavLink to='/login' className='nav-link link' style={{color:'#DAD7CD'}}>
                                        <i className="fa-solid fa-right-to-bracket" style={{color:'#DAD7CD'}}></i> Iniciar Sesión
                                    </NavLink>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;