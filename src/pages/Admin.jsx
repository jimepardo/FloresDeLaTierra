import React, { useContext, useEffect, useRef } from 'react';
import ProductAddForm from '../components/ProductAddForm';
import ProductEditForm from '../components/ProductEditForm';
import { useNavigate } from 'react-router-dom';
import {AdminContext} from '../context/AdminContext';
import { Modal } from 'bootstrap';

const Admin = () => {

    const navigate = useNavigate();

    const { products, load, open, setOpen, selected, setSelected, openEditor, setOpenEditor,
        addProduct, editProduct, deleteProduct
    } = useContext(AdminContext);

    const addModalRef = useRef(null);
    const editModalRef = useRef(null);

    useEffect(() => {
        let addBsModal = null;
        let editBsModal = null;

        if (addModalRef.current) {
            addBsModal = new Modal(addModalRef.current);
            if (open) {
                addBsModal.show();
            } else {
                addBsModal.hide();
            }
        }

        if (editModalRef.current) {
            editBsModal = new Modal(editModalRef.current);
            if (openEditor) {
                editBsModal.show();
            } else {
                editBsModal.hide();
            }
        }

        const handleAddModalHidden = () => setOpen(false);
        if (addModalRef.current) {
            addModalRef.current.addEventListener('hidden.bs.modal', handleAddModalHidden);
        }

        const handleEditModalHidden = () => {
            setOpenEditor(false);
            setSelected(null);
        };
        if (editModalRef.current) {
            editModalRef.current.addEventListener('hidden.bs.modal', handleEditModalHidden);
        }

        return () => {
            if (addModalRef.current) {
                addModalRef.current.removeEventListener('hidden.bs.modal', handleAddModalHidden);
            }
            if (editModalRef.current) {
                editModalRef.current.removeEventListener('hidden.bs.modal', handleEditModalHidden);
            }
            if (addBsModal) addBsModal.hide();
            if (editBsModal) editBsModal.hide();
        };
    }, [open, openEditor, setOpen, setOpenEditor, setSelected]);

    const getPrice = (price) => {
        return price.toLocaleString('es-ES', {
            style: 'decimal',
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return (
        <div id='main-content-wrapper'>
            {load ? (
                <p>Cargando...</p>
            ) : (
                <div className='container-fluid'><br />
                    <h1 className="title" style={{ color: '#344E41' }} >Panel Administrativo</h1>
                    <br />
                    <button className="btn mb-3 btnSession p-2" onClick={() => setOpen(true)}>
                        Agregar Producto
                    </button>
                    <ul className="list">
                        {products.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="listItemImage"
                                />
                                <span>{product.name}</span>
                                <span>${getPrice(product.price)}</span>
                                <div>
                                    <button className="btn btnSession" onClick={() => {
                                        setOpenEditor(true)
                                        setSelected(product)
                                    }}>Editar</button>

                                    <button className="btn m-2 btn-seem" onClick={() => deleteProduct(product.id)} >Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true" ref={addModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">Agregar Nuevo Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ProductAddForm
                                onAdd={(newProduct) => {
                                    addProduct(newProduct);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true" ref={editModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProductModalLabel">Editar Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {selected && ( 
                                <ProductEditForm
                                    selectedProduct={selected}
                                    onEdit={(updatedProduct) => {
                                        editProduct(updatedProduct);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Admin;