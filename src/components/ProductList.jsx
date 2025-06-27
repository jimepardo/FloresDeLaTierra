import React, { useContext, useState } from "react";
import Product from "./Product";
import { CartContext } from "../context/CartContext";

const ProductList = () => {

    const { products, productsFiltered, search, setSearch } = useContext(CartContext);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsFiltered.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(productsFiltered.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    } 

    return (
        <>
            <br />
            <div className="row justify-content-end mb-4"> 
                <div className="col-12 col-md-4 col-lg-3">
                    <form role="search">
                        <input
                            className="form-control" 
                            type="search"
                            placeholder="Buscar productos ..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <br />
            <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                {
                    currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <Product key={product.id} product={product} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#344E41' }}>No se encontraron productos.</p>
                    )
                }
            </div>
            {totalPages > 1 && ( 
                <nav aria-label="Paginación de productos" className="mt-4" style={{background:'transparent'}}>
                    <ul className="pagination justify-content-center">

                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}` }>
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
        </>
    )
};

export default ProductList;