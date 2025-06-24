import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)

    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        fetch('https://6833e4df464b4996360096f0.mockapi.io/products-ecommerce/products')
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProducts(data);
                    setLoad(false);
                }, 2000);
            })
            .catch((error) => {
                console.error('Error: ', error)
                setLoad(false)
                setError(true)
            });
    }, []);

    const addToCart = (product) => {
        const productExists = cartItems.find(item => item.id === product.id)

        if (productExists) {
            setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
            setCartItems([...cartItems, product ])
        }
    }

    const deleteProduct = (product) => {
        setCartItems(preVCart => {
            return preVCart.map(item => {
                if (item.id === product.id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return null;
                    }
                } else {
                    return item;
                }
            }).filter(item => item != null);
        });
    };

    const emptyCart = () => {
        setCartItems([])
    };

    
    return (
        <CartContext.Provider value={
            {
                cartItems, products, load, error, addToCart, deleteProduct, emptyCart, isAuthenticated, isCartOpen, setCartOpen, setIsAuth
            }
        } >
            {children}
        </CartContext.Provider>
    )
}