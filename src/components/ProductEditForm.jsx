import React, { useState, useEffect } from 'react';

function ProductEditForm({ selectedProduct, onEdit }) {
    const [product, setProduct] = useState(selectedProduct);

    useEffect(() => {
        setProduct(selectedProduct)
    }, [selectedProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category' && value !== product.category) {
            product.subcategory = '';
        }
        if (name === 'price') {
            setProduct({ ...product, [name]: parseFloat(value) }); 
        } else if (name === 'stock') {
            setProduct({ ...product, [name]: parseInt(value, 10) }); 
        }
        setProduct({ ...product, [name]: value });
    };

    const categoriesData = [
        {
            name: "Plantas de Exterior",
            subcategories: ["Media Sombra", "Pleno Sol"]
        },
        {
            name: "Plantas de Interior",
            subcategories: ["Con Flor", "Helechos", "Palmeras", "Begonias"]
        }
    ];

    const selectedCategory = categoriesData.find(cat => cat.name === product.category);
    const subcategoriesForSelectedCategory = selectedCategory ? selectedCategory.subcategories : [];

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onEdit(product)
        }}
            style={{
                marginLeft: '60px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <div>
                <label>ID:</label>
                <input className='form-control'
                    type="number"
                    name="id"
                    value={product.id || ''}
                    disabled
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
                <label>Categoría: </label>
                <select
                    className="form-select"
                    name="category"
                    value={product.category || ''}
                    onChange={handleChange}
                    aria-label="Seleccione una categoría"
                    required>
                    <option value="">Seleccione una categoría</option>
                    {categoriesData.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            {product.category && (
                <div>
                    <label>Subcategoría: </label>
                    <select
                        className="form-select"
                        name="subcategory"
                        value={product.subcategory || ''}
                        onChange={handleChange}
                        aria-label="Seleccione una subcategoría"
                        required
                    >
                        <option value="">Seleccione una subcategoría</option>
                        {subcategoriesForSelectedCategory.map((subcat) => (
                            <option key={subcat} value={subcat}>
                                {subcat}
                            </option>
                        ))}
                    </select>
                </div>
            )}        
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
                <label>Cantidad:</label>
                <input className='form-control'
                    type="number"
                    name="quantity"
                    value={product.quantity || '0'}
                    disabled
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea className='form-control'
                    type="text"
                    name="description"
                    value={product.description || ''}
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
            </div><br />
            <button className='btn btnSession' type="submit">Actualizar Producto</button>
        </form>
    );
}

export default ProductEditForm;
