import React, { useContext } from 'react';
import ProductAddForm from '../components/ProductAddForm';
import ProductEditForm from '../components/ProductEditForm';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import AdminContext from '../context/AdminContext';

const Admin = () => {
    const { setIsAuth } = useContext(CartContext);

    const navigate = useNavigate();

    const { products, load, open, setOpen, selected, setSelected, openEditor, setOpenEditor,
        addProduct, editProduct, deleteProduct
    } = useContext(AdminContext)

    return (
        <div id='main-content-wrapper'>
            {load ? (
                <p>Cargando...</p>
            ) : (
                <><br />
                    <nav>
                        <ul className="nav">
                            <li className="navItem">
                                <button className="navButton" onClick={() => {
                                    setIsAuth(false);
                                    navigate('/');
                                    localStorage.removeItem('isAuth');
                                }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </li>
                            <li className="navItem">
                                <a href="/admin">Admin</a>
                            </li>
                        </ul>
                    </nav>
                    <h2 className="title" style={{ color: '#344E41' }} >Panel Administrativo</h2>
                    <ul className="list">
                        {products.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="listItemImage"
                                />
                                <span>{product.name}</span>
                                <span>${product.price}</span>
                                <div>
                                    <button className="btn btn-secondary" onClick={() => {
                                        setOpenEditor(true)
                                        setSelected(product)
                                    }}>Editar</button>

                                    <button className="btn btn-danger m-2" onClick={() => deleteProduct(product.id)} >Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button onClick={() => setOpen(true)}>Agregar Producto</button>
            {open && (<ProductAddForm onAdd={addProduct} />)}
            {openEditor && (<ProductEditForm selectedProduct={selected} onEdit={editProduct} />)}
        </div>
    );
};

export default Admin;