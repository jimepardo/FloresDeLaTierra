import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(true);
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(null);
    const [openEditor, setOpenEditor] = useState(false);

    const apiUrl = 'https://6833e4df464b4996360096f0.mockapi.io/products-ecommerce/products'

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProducts(data);
                    setLoad(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoad(false);
            });
    }, []);

    const loadProducts = async () => {
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.log('Error al cargar los productos', error);
        }
    }

    const addProduct = async (product) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (!response.ok) {
                throw new Error('Error al agregar producto');
            }
            const data = await response.json()
            Swal.fire({
                title: ":)!",
                text: "Producto agregado correctamente!",
                icon: "success"
            });
            loadProducts()
            setOpen(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    const editProduct = async (product) => {
        try {
            const response = await fetch(`${apiUrl}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (!response.ok) throw Error('Error al actualizar el producto')
            const data = await response.json()
            Swal.fire({
                title: ":)!",
                text: "Producto actualizado correctamente!",
                icon: "success"
            });
            setOpenEditor(false)
            setSelected(null)
            loadProducts()
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteProduct = async (id) => {
        const confirm = window.confirm('¿Estás seguro que deseas eliminar el producto?')
        if (confirm) {
            try {
                const response = await fetch(apiUrl`/${id}`, {
                    method: 'DELETE'
                })
                if (!response.ok) throw Error('Error al eliminar')
                Swal.fire({
                    title: ":(!",
                    text: "Producto eliminado correctamente",
                    icon: "error"
                });
                loadProducts()
            } catch (error) {
                alert('Hubo un problema al eliminar el producto')
            }
        }
    }

    return (
        <AdminContext.Provider value={{
            products, load, open, setOpen, selected, setSelected, openEditor, setOpenEditor,
            addProduct, editProduct, deleteProduct
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext;