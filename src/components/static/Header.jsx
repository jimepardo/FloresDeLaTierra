import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"
import Cart from "../Cart";
import "./styles/navbar.css";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { FaRightToBracket, FaRightFromBracket, FaCartShopping } from "react-icons/fa6";
import { BiChevronDown } from "react-icons/bi";
import { Dropdown, Collapse } from "bootstrap/dist/js/bootstrap.bundle.min";

function Header() {

    const { isCartOpen, setCartOpen } = useContext(CartContext);
    const { isLoggedIn, userInfo, logout } = useAuth();

    const [isProductsMobileOpen, setProductsMobileOpen] = useState(false);
    const [isExteriorMobileOpen, setExteriorMobileOpen] = useState(false);
    const [isInteriorMobileOpen, setInteriorMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
    }

    const handleNavLinkClick = () => {
        const navbarCollapse = document.getElementById('navbarCollapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
        setProductsMobileOpen(false);
        setExteriorMobileOpen(false);
        setInteriorMobileOpen(false);
    };

    const openCartAndCloseNav = () => {
        setCartOpen(true);
    }

    const handleProductsMobileToggle = (e) => {
        e.preventDefault(); 
        setProductsMobileOpen(prev => !prev);
        setExteriorMobileOpen(false);
        setInteriorMobileOpen(false);
    };

    const handleExteriorMobileToggle = (e) => {
        e.preventDefault();
        setExteriorMobileOpen(prev => !prev);
    };

    const handleInteriorMobileToggle = (e) => {
        e.preventDefault();
        setInteriorMobileOpen(prev => !prev);
    };

    useEffect(() => {
        const navbarCollapseElement = document.getElementById('navbarCollapse');
        if (navbarCollapseElement) {
            new Collapse(navbarCollapseElement, { toggle: false });
        }

        const dropdownToggleElements = document.querySelectorAll('.nav-item.dropdown.d-lg-block .dropdown-toggle');
        dropdownToggleElements.forEach(function (element) {
            new Dropdown(element);
        });

    }, []);


    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top" >
                <div className="container-fluid" >
                    <NavLink className='navbar-brand' to="/">
                        <img className="imgLogo " src={logo} />
                    </NavLink>
                    <button className="navbar-toggler collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" data-component="menu">
                            {(!isLoggedIn || (isLoggedIn && userInfo?.role === "client")) && (
                                <>
                                    <li className="nav-item" data-component="menu.item">
                                        <NavLink className='link nav-link' to="/" onClick={handleNavLinkClick}> INICIO </NavLink>
                                    </li>
                                    <li className="nav-item dropdown d-none d-lg-block" data-component="menu.item">
                                        <NavLink
                                            className={({ isActive }) =>
                                                `link nav-link dropdown-toggle ${isActive || window.location.pathname.startsWith('/products') ? 'active' : ''}`
                                            }
                                            to="/products"
                                            id="productsDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                             >PRODUCTOS </NavLink>
                                        <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                                            <li className="nav-item dropdown dropend" data-component="menu.item">
                                                <a
                                                    className="dropdown-item dropdown-toggle"
                                                    href="#"
                                                    role="button"
                                                    id="exteriorDropdown"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    >Plantas de Exterior</a>
                                                <ul className="dropdown-menu" aria-labelledby="exteriorDropdown">
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-exterior/media-sombra" data-component="menu.item" >Media Sombra</NavLink> </li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-exterior/pleno-sol" data-component="menu.item">Pleno Sol</NavLink> </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-exterior" data-component="menu.item">Ver todas Plantas de Exterior</NavLink> </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown dropend" data-component="menu.item">
                                                <a
                                                    className='dropdown-item dropdown-toggle'
                                                    href="#"
                                                    role="button"
                                                    id="interiorDropdown"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    >Plantas de Interior</a>
                                                <ul className="dropdown-menu" aria-labelledby="interiorDropdown">
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/con-flor" data-component="menu.item">Con Flor</NavLink> </li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/helechos" data-component="menu.item">Helechos</NavLink> </li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/palmeras" data-component="menu.item">Palmeras</NavLink> </li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior/begonias" data-component="menu.item">Begonias</NavLink> </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><NavLink className='link dropdown-item' to="/products/plantas-de-interior" data-component="menu.item">Ver todas Plantas de Interior</NavLink> </li>
                                                </ul>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><NavLink className="dropdown-item" to="/products" data-component="menu.item" end>Todos los productos</NavLink></li>
                                        </ul>
                                    </li>

                                    {/* Menu productos mobile */}
                                     <li className="nav-item d-block d-lg-none">
                                        <a
                                            className={`link nav-link ${isProductsMobileOpen ? 'active' : ''}`}
                                            href="#productsMobileCollapse"
                                            role="button"
                                            onClick={handleProductsMobileToggle}
                                            aria-expanded={isProductsMobileOpen}
                                            data-bs-toggle="collapse"
                                            data-bs-target="#productsMobileCollapse"
                                        >
                                            PRODUCTOS<BiChevronDown className={`${isProductsMobileOpen ? 'rotate-180' : ''}`}/> 
                                        </a>
                                        <div className={`collapse ${isProductsMobileOpen ? 'show' : ''}`} id="productsMobileCollapse">
                                            <ul className="navbar-nav ms-3">
                                                <li className="nav-item">
                                                    <a
                                                        className={`link nav-link ${isExteriorMobileOpen ? 'active' : ''}`} 
                                                        href="#exteriorMobileCollapse"
                                                        onClick={handleExteriorMobileToggle}
                                                        aria-expanded={isExteriorMobileOpen}
                                                        data-bs-toggle="collapse"
                                                        role="button"
                                                    >Plantas de Exterior <BiChevronDown className={`${isExteriorMobileOpen ? 'rotate-180' : ''}`}/></a>
                                                    <div className={`collapse ${isExteriorMobileOpen ? 'show' : ''}`} id="exteriorMobileCollapse">
                                                        <ul className="navbar-nav ms-4"> 
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-exterior/media-sombra" onClick={handleNavLinkClick} >Media Sombra</NavLink> </li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-exterior/pleno-sol" onClick={handleNavLinkClick}>Pleno Sol</NavLink> </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-exterior" onClick={handleNavLinkClick}>Ver todas Plantas de Exterior</NavLink> </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className={`link nav-link ${isInteriorMobileOpen ? 'active' : ''}`}
                                                        href="#interiorMobileCollapse"
                                                        onClick={handleInteriorMobileToggle}
                                                        aria-expanded={isInteriorMobileOpen}
                                                        data-bs-toggle="collapse"
                                                        role="button"
                                                    >Plantas de Interior <BiChevronDown className={`${isInteriorMobileOpen ? 'rotate-180' : ''}`}/> </a>
                                                    <div className={`collapse ${isInteriorMobileOpen ? 'show' : ''}`} id="interiorMobileCollapse">
                                                        <ul className="navbar-nav ms-4"> 
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-interior/con-flor" onClick={handleNavLinkClick}>Con Flor</NavLink> </li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-interior/helechos" onClick={handleNavLinkClick}>Helechos</NavLink> </li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-interior/palmeras" onClick={handleNavLinkClick}>Palmeras</NavLink> </li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-interior/begonias" onClick={handleNavLinkClick}>Begonias</NavLink> </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><NavLink className='link nav-link' to="/products/plantas-de-interior" onClick={handleNavLinkClick}>Ver todas Plantas de Interior</NavLink> </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><NavLink className="link nav-link" to="/products" end onClick={handleNavLinkClick}>Todos los productos</NavLink></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='link nav-link' to="/howto" onClick={handleNavLinkClick}> CUIDADOS </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='link nav-link' to="/about" onClick={handleNavLinkClick}> ACERCA DE </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='link nav-link' to="/contact" onClick={handleNavLinkClick}> CONTACTO </NavLink>
                                    </li>
                                    <li className="cartNav nav-item">
                                        <button className="btnCart btn-link nav-link " onClick={openCartAndCloseNav}><FaCartShopping /></button>
                                        <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
                                    </li>
                                </>

                            )}
                            {isLoggedIn && userInfo?.role === 'admin' && (
                                <li className="nav-item">
                                    <NavLink className='link nav-link' to="/admin" onClick={handleNavLinkClick}> PANEL ADMINISTRATIVO </NavLink>
                                </li>
                            )}

                            <li className="nav-item">
                                {isLoggedIn ? (
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link" style={{ color: '#344E41', fontWeight: 'bold', marginRight: '10px' }}>
                                            {userInfo?.role === 'admin' ? 'Admin' : userInfo?.name}
                                        </span>
                                        <button type="button" className="btn btn-sm btnSession" onClick={handleLogout}>
                                            <span className='desc nav-link'>
                                                <FaRightFromBracket className="icon-fld" /> Salir
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <button type="button" className="btn btn-sm btnSession">
                                        <NavLink to='/login' className='desc nav-link' onClick={handleNavLinkClick}>
                                            <FaRightToBracket className="icon-fld" /> Iniciar Sesión
                                        </NavLink>
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;