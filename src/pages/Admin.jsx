import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';

const Admin = () => {

    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [load, setLoad] = useState(true);
    const [open, setOpen] = useState(false);

  useEffect(() => {
        fetch("https://6833e4df464b4996360096f0.mockapi.io/products-ecommerce/products")
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

    const addProduct = async (product) =>{
        try{
            const response = await fetch("https://6833e4df464b4996360096f0.mockapi.io/products-ecommerce/products",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if(!response.ok){
                throw new Error('Error al agregar producto');
            }
            const data = await response.json()
            alert('Producto agregado correctamente')
        } catch(error){
            console.log(error.message);
        }
    }
    return (
        <>
            {load ? (
                <p>Cargando...</p>
            ) : (
                <><br />
                    <h2 className="title">Panel Administrativo</h2>
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
                                    <button className="btn btn-secondary">Editar</button>

                                    <button className="btn btn-danger m-2">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button onClick={() => setOpen(true)}>Agregar Producto</button>
            {open && (<ProductForm onAdd={addProduct}/>)}
        </>
    );
};

export default Admin;