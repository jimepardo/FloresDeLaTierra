import React, { useState } from 'react';

function ProductAddForm({ onAdd }) {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        stock: '',
        quantity: 0,
        description: '',
        img: '',
    });

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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category' && value !== product.category) {
            product.subcategory = '';
        }

        if (name === 'price') {
            product[name] = parseFloat(value);
        } else if (name === 'stock') {
            product[name] = parseInt(value, 10);
        }
        setProduct({ ...product, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!product.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }
        if (!product.category.trim()) {
            newErrors.category = 'La categoría es obligatoria';
        }
        if (!product.subcategory.trim()) {
            newErrors.subcategory = 'La subcategoría es obligatoria';
        }
        if (!product.price || product.price <= 0) {
            newErrors.price = 'El precio debe ser mayor a 0';
        }
        if (!product.stock || product.stock <= 0) {
            newErrors.stock = 'El stock debe ser mayor a 0';
        }
        if (!product.description.trim() || product.description.length < 10) {
            newErrors.description = 'Debe contener una breve descripción';
        }
        if (!product.img.trim() || product.img.length < 10) {
            newErrors.img = 'Debe contener link a imagen';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        onAdd(product);
        setProduct({ name: '', category: '', subcategory: '', price: '', stock: '', quantity: '', description: '', img: '' });
    };

    const selectedCategory = categoriesData.find(cat => cat.name === product.category);
    const subcategoriesForSelectedCategory = selectedCategory ? selectedCategory.subcategories : [];

    return (
        <form onSubmit={handleSubmit}
            style={{
                marginLeft: '60px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: 'auto',
            }}>
            <div>
                <label>Nombre:</label>
                <input className='form-control'
                    type="text" name="name" value={product.name} onChange={handleChange} required />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
                <label>Categoría: </label>
                <select
                    className="form-select"
                    name="category"
                    value={product.category}
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
                {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
            </div>
            {product.category && (
                <div>
                    <label>Subcategoría: </label>
                    <select
                        className="form-select"
                        name="subcategory"
                        value={product.subcategory}
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
                    {errors.subcategory && <p style={{ color: 'red' }}>{errors.subcategory}</p>}
                </div>
            )}
            <div>
                <label>Precio:</label>
                <input className='form-control' type="number" name="price" value={product.price} onChange={handleChange} required
                    min="0" />
                {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
            </div>
            <div>
                <label>Stock:</label>
                <input className='form-control' type="number" name="stock" value={product.stock} onChange={handleChange} required
                    min="0" />
                {errors.stock && <p style={{ color: 'red' }}>{errors.stock}</p>}
            </div>
            <div>
                <label>Descripción:</label>
                <textarea className='form-control'
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
            </div>
            <div>
                <label>Imagen:</label>
                <textarea className='form-control'
                    name="img"
                    value={product.img}
                    onChange={handleChange}
                    required
                />
                {errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}
            </div>
            <button className='btn btnSession' type="submit">Agregar Producto</button>
        </form>
    );
}

export default ProductAddForm;