import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';

function ProductListByCategory() {
    const { category, subcategory } = useParams();
    const { products, load } = useContext(CartContext);

    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let productsToFilter = products;
        if (category) {
            const categoryFromUrl = category.replace(/-/g, ' ');
            productsToFilter = productsToFilter.filter(p => p.category.toLowerCase() === categoryFromUrl.toLowerCase());
        }
        if (subcategory) {
            const subcategoryFromUrl = subcategory.replace(/-/g, ' ');
            productsToFilter = productsToFilter.filter(p => p.subcategory.toLowerCase() === subcategoryFromUrl.toLowerCase());
        }
        if (search) {
            productsToFilter = productsToFilter.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        setFilteredProducts(productsToFilter);
        setCurrentPage(1);
    }, [category, subcategory, search, products]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const displayTitle = () => {
        const formattedCategory = category ? category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
        const formattedSubcategory = subcategory ? subcategory.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

        if (formattedCategory && formattedSubcategory) {
            return `${formattedCategory} - ${formattedSubcategory}`;
        } else if (formattedCategory) {
            return formattedCategory;
        } else if (search) {
            return `Resultados para "${search}"`;
        }
        return "Todos los Productos";
    }

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div id='main-content-wrapper'><br/>
            <div className="" style={{ padding: '20px', maxWidth: '80%', margin: '0 auto'}}>
                <h1 style={{ textAlign: 'center', color: '#344E41' }}>{displayTitle()}</h1>
                <br /><br/>
                {/* Input de Búsqueda */}
                <div className="row justify-content-end mb-4 container-fluid">
                    <div className="col-12 col-md-4 col-lg-3">
                        <form role="search">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Buscar productos ..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                </div>
                <br />
                <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                    {
                        currentProducts.length > 0 ? ( // Renderiza los productos de la página actual
                            currentProducts.map(product => (
                                <Product key={product.id} product={product} />
                            ))
                        ) : (
                            // Muestra el mensaje si no hay productos filtrados (o si 'load' es falso y no hay productos)
                            <p style={{ textAlign: 'center', color: '#344E41' }}>
                                {load ? 'Cargando productos...' : 'No se encontraron productos para esta selección.'}
                            </p>
                        )
                    }
                </div>

                {totalPages > 1 && (
                    <nav aria-label="Paginación de productos" className="mt-4" style={{ background: 'transparent' }}>
                        <ul className="pagination justify-content-center">

                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Anterior">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>

                            {pageNumbers.map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number)} className="page-link">
                                        {number}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Siguiente">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default ProductListByCategory;