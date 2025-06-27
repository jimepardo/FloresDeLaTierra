import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(true);
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(null);
    const [openEditor, setOpenEditor] = useState(false);
    const [error, setError] = useState(false);

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
        setLoad(true);
        setError(false);
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.log('Error al cargar los productos', error);
            setError(true);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los productos. Inténtalo de nuevo.",
                icon: "error"
            });
        } finally {
            setTimeout(() => { 
                setLoad(false);
            }, 500); 
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
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el producto.",
                icon: "error"
            });
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
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el producto.",
                icon: "error"
            });
        }
    }

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!",
            cancelButtonText: "Cancelar"
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(apiUrl`/${id}`, {
                    method: 'DELETE'
                })
                if (!response.ok) throw Error('Error al eliminar')
                Swal.fire({
                    title: "Eliminado!",
                    text: "Producto eliminado correctamente",
                    icon: "error"
                });
                loadProducts()
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al eliminar el producto.",
                    icon: "error"
                });
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