import React, { useContext } from "react";
import Product from "./Product";
import { CartContext } from "../context/CartContext";

const ProductList = () => {

    const { products, addToCart } = useContext(CartContext);
    
    return (
        <>
            <br />
            <div className="row justify-content-center g-4" >
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