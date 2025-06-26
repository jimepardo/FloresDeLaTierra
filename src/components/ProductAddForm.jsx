import React, { useState } from 'react';

function ProductAddForm({ onAdd }) {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        img: '',
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({...product, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if(!product.name.trim()){
            newErrors.name = 'El nombre es obligatorio';
        }
        if(!product.price || product.price <= 0 ){
            newErrors.price = 'El precio debe ser mayor a 0';
        }
        if(!product.stock || product.stock <= 0 ){
            newErrors.stock = 'El stock debe ser mayor a 0';
        }
        if(!product.img.trim() || product.img.length < 10 ){
            newErrors.img = 'Debe contener link a imagen';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        onAdd(product);
        setProduct({ name: '', price: '', stock: '', img: ''});
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text" name="name" value={product.name} onChange={handleChange} required />
                     {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} required
                    min="0" />
                    {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" name="stock" value={product.stock} onChange={handleChange} required
                    min="0" />
                    {errors.stock && <p style={{ color: 'red' }}>{errors.stock}</p>}
            </div>
            <div>
                <label>Imagen:</label>
                <textarea
                    name="img"
                    value={product.img}
                    onChange={handleChange}
                    required
                />
                {errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    );
}

export default ProductAddForm;