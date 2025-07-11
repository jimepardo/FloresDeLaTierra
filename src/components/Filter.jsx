import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Filter.css'; 

const Filter = () => {
    return (
        <>
            <div className="sidebar" style={{ paddingRight: '20px' }}> {/* Add some padding */}
                <h5 style={{ color: '#344E41' }}>Filtrar</h5> {/* */}
                <ul className="list-unstyled">
                    <li>
                        <h6 style={{ color: '#344E41' }}>Plantas de Exterior</h6> {/* */}
                        <ul className="list-unstyled ms-3">
                            <li><NavLink to="/products/plantas-de-exterior/pleno-sol" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Pleno Sol</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-exterior/media-sombra" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Media Sombra</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-exterior" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")} end>Ver todas Plantas de Exterior</NavLink></li> {/* */}
                        </ul>
                    </li>
                    <li className="mt-2">
                        <h6 style={{ color: '#344E41' }}>Plantas de Interior</h6> {/* Add interior plant category */}
                        <ul className="list-unstyled ms-3">
                            <li><NavLink to="/products/plantas-de-interior/con-flor" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Con Flor</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-interior/helechos" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Helechos</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-interior/palmeras" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Palmeras</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-interior/begonias" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")}>Begonias</NavLink></li> {/* */}
                            <li><NavLink to="/products/plantas-de-interior" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")} end>Ver todas Plantas de Interior</NavLink></li> {/* */}
                        </ul>
                    </li>
                    <li className="mt-2">
                        <NavLink to="/products" className={({ isActive }) => "link" + (isActive ? " active-filter" : "")} end>Todos los Productos</NavLink> {/* Link to show all products */}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Filter
