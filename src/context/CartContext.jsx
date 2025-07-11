import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")

    const [isCartOpen, setCartOpen] = useState(false);

    const apiUrl = 'https://6833e4df464b4996360096f0.mockapi.io/products-ecommerce/products'

    const loadProducts = async () => {
        setLoad(true);
        setError(false);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            setLoad(false);
        } catch (err) {
            console.error('Error fetching products from API:', err);
            setError(true);
            setLoad(false);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los productos. Inténtalo de nuevo.",
                icon: "error"
            });
        } finally {
            setTimeout(() => {
                setLoad(false);
            }, 500);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    const productsFiltered = products.filter((product) => product?.name.toLowerCase().includes(search.toLowerCase()))

    const addToCart = (product) => {
        const productExists = cartItems.find(item => item.id === product.id)

        if (productExists) {
            setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: product.quantity } : item))
        } else {
            toast.success(`El producto ${product.name} se ha agregado al carrito`)
            setCartItems([...cartItems, { ...product, quantity: product.quantity }])
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
        localStorage.removeItem("cart")
        toast.info('El carrito se vació')
    };

    const buy = async () => {
        const updatedLocalProducts = products.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            if (cartItem) {
                return { ...product, stock: Math.max(0, product.stock - cartItem.quantity) };
            }
            return product;
        });

        const updatePromises = cartItems.map(async (item) => {
            const productToUpdate = updatedLocalProducts.find(p => p.id === item.id);
            if (productToUpdate) {
                try {
                    const response = await fetch(`${apiUrl}/${productToUpdate.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...productToUpdate, stock: productToUpdate.stock })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error(`Error al actualizar el stock de ${productToUpdate.name} (ID: ${productToUpdate.id}):`, response.status, errorData);
                        toast.error(`Error al actualizar el stock de ${productToUpdate.name}.`);
                        throw new Error(`Failed to update stock for ${productToUpdate.name}`);
                    }
                } catch (error) {
                    console.error(`Error de red o API al actualizar el stock de ${productToUpdate.name}:`, error);
                    toast.error(`Error de red o inesperado al actualizar el stock de ${productToUpdate.name}.`);
                    throw error;
                }
            }
        });

        try {
            await Promise.all(updatePromises);
            await loadProducts(); // Recargar productos después de actualizar el stock
            setCartItems([]);
            localStorage.removeItem("cart");
            let timerInterval;
            Swal.fire({
                title: "Compra finalizada!",
                html: "Esto se cerrá automáticamente en <b></b>.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            });
            loadProducts();
        } catch (error) {
            console.error("Una o más actualizaciones de stock fallaron:", error);
            toast.error('¡Compra finalizada, pero hubo un error al actualizar el stock de algunos productos!');
            loadProducts(); // Recargar productos para reflejar el stock actualizado
        }
    }

    return (
        <CartContext.Provider value={
            {
                cartItems, products, load, error, addToCart, deleteProduct, emptyCart, isCartOpen, setCartOpen,
                productsFiltered, search, setSearch, buy
            }
        } >
            {children}
        </CartContext.Provider>
    )
}