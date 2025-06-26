import React, { useContext } from "react";
import Product from "./Product";
import { CartContext } from "../context/CartContext";

const ProductList = () => {

    const { products, productsFiltered, search, setSearch } = useContext(CartContext);
    
    return (
        <>
            <br />
            <input type="text" placeholder="Buscar productos ..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="row justify-content-center g-4" style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}} >
                {
                    products.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
};

export default ProductList;