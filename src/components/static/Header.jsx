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
            <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#A3B18A' }}>
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
                            <li className="nav-item dropdown">
                                <NavLink
                                    className='nav-link dropdown-toggle'
                                    to="/products"
                                    id="productsDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false" >PRODUCTOS </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                                    <li className="nav-item dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            to="#"
                                            id="exteriorDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">Plantas de Exterior</a>
                                        <ul className="dropdown-menu" aria-labelledby="exteriorDropdown">
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-exterior/media-sombra" >Media Sombra</NavLink> </li>
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-exterior/pleno-sol">Pleno Sol</NavLink> </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropend">
                                        <a
                                            className='dropdown-item dropdown-toggle'
                                            to="#"
                                            id="interiorDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">Plantas de Interior</a>
                                        <ul className="dropdown-menu" aria-labelledby="interiorDropdown">
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/con-flor">Con Flor</NavLink> </li>
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/helechos">Helechos</NavLink> </li>
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/palmeras">Palmeras</NavLink> </li>
                                            <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/begonias">Begonias</NavLink> </li>
                                        </ul>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" to="/products" end>Todos los productos</NavLink></li>
                                </ul>
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
                                    <NavLink to='/login' className='nav-link link' style={{ color: '#DAD7CD' }}>
                                        <i className="fa-solid fa-right-to-bracket" style={{ color: '#DAD7CD' }}></i> Iniciar Sesión
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