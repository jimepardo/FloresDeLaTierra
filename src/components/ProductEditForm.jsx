import React, { useState, useEffect } from 'react';

function ProductEditForm({ selectedProduct, onEdit }) {
    const [product, setProduct] = useState(selectedProduct);

    useEffect(() => {
        setProduct(selectedProduct)
    }, [selectedProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({...product, [name]:value });
    };

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            onEdit(product)
        }}>
            <h2>Editar Producto</h2>
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    name="id"
                    value={product.id || ''}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={product.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    value={product.stock || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Imagen URL:</label>
                <input
                    type="text"
                    name="img"
                    value={product.img || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Actualizar Producto</button>
        </form>
    );
}

export default ProductEditForm;
