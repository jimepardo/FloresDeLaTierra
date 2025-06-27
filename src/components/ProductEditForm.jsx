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
            <div>
                <label>ID:</label>
                <input className='form-control'
                    type="number"
                    name="id"
                    value={product.id || ''}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input className='form-control'
                    type="text"
                    name="name"
                    value={product.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input className='form-control'
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
                <input className='form-control'
                    type="number"
                    name="stock"
                    value={product.stock || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Imagen URL:</label>
                <textarea className='form-control'
                    type="text"
                    name="img"
                    value={product.img || ''}
                    onChange={handleChange}
                    required
                />
            </div><br/>
            <button className='btn btnSession' type="submit">Actualizar Producto</button>
        </form>
    );
}

export default ProductEditForm;
