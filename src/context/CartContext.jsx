import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)
    const [search, setSearch] = useState("")

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

    const productsFiltered = products.filter((product) => product?.name.toLowerCase().includes(search.toLowerCase()))

    const addToCart = (product) => {
        const productExists = cartItems.find(item => item.id === product.id)

        if (productExists) {
            setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: product.quantity } : item))
        } else {
            toast.success(`El producto ${product.name} se ha agregado al carrito`)
            setCartItems([...cartItems, {...product, quantity: product.quantity} ])
        }
    }

    const deleteProduct = (product) => {
        toast.error(`El producto ${product.name} se ha eliminado al carrito`)
        setCartItems(prevCart => {
            return prevCart.map(item => {
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
                cartItems, products, load, error, addToCart, deleteProduct, emptyCart, isAuthenticated, isCartOpen, setCartOpen, setIsAuth,
                search, setSearch
            }
        } >
            {children}
        </CartContext.Provider>
    )
}