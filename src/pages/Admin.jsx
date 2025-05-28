import React, { useState, useEffect } from 'react';

const Admin = () => {

    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [load, setLoad] = useState(true);

  useEffect(() => {
        fetch("/data/data.json")
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

    return (
        <>
            {load ? (
                <p>Cargando...</p>
            ) : (
                <><br />
                    <h2 className="title">Panel Administrativo</h2>
                    <form className="form">
                        <input
                            className='form-control input'
                            type="text"
                            name="name"
                            placeholder="Nombre del producto"           
                            required
                        />
                        <input
                            className='form-control input'
                            type="number"
                            name="price"
                            placeholder="Precio del producto"
                            required
                        />
                        <button type="submit" className="btn btn-success">
                            {form.id ? "Editar" : "Crear"}
                        </button>
                    </form>
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
        </>
    );
};

export default Admin;