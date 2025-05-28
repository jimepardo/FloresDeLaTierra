import React, { useState } from 'react';


function Form() {

    const [product, setProduct] = useState({
        name:'',
        price:'',
        description:'',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();
        alert(`Formulario enviado por: ${nombre}`);

    }


    return (
        <form style={{ marginLeft: '60px' }} onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <label>Nombre: </label>
            <input
                type="text"
                value={product.name}
                onChange={handleChange}
                placeholder="Ingresa nombre del producto"
            />

            <button type="submit">Enviar</button>
        </form>
    );
}

export default Form;