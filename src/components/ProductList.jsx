import React, { useContext, useState, useEffect } from "react";
import Product from "./Product";
import { CartContext } from "../context/CartContext";
import Search from "./Search";
import Pagination from "./Pagination";

const ProductList = ({ category, subcategory }) => {

    const { products, load, productsFiltered, search, setSearch } = useContext(CartContext);

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


    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>

            <Search search={search} handleSearchChange={handleSearchChange} />

            <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                {
                    currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <Product key={product.id} product={product} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#344E41' }}>
                            {load ? 'Cargando productos...' : 'No se encontraron productos para esta selección.'}
                        </p>
                    )
                }
            </div>
            <Pagination
                currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </>
    )
};

export default ProductList;