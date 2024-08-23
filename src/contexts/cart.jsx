import { createContext, useEffect, useState } from "react";
import _products from "./../mocks/products.json";

// create context
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [categorySelected, setCategorySelected] = useState("all");
    const [filterProducts, setFilterProducts] = useState(null);

    useEffect(() => {
        setProducts(_products);
        setFilterProducts(_products);
    }, []);

    const selectCategory = (category) => {
        setCategorySelected(category);
        const filtedProducts = products.filter(
            (product) => product?.type?.toLowerCase() === category?.toLowerCase()
        );
        setFilterProducts(filtedProducts?.length > 0 ? filtedProducts : products);
    };

    const filterBySearch = (search) => {
        setFilterProducts(
            products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) &&
                    (product?.type?.toLowerCase() === categorySelected ||
                        categorySelected === "all")
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                products: filterProducts,
                categorySelected,
                setProducts,
                selectCategory,
                filterBySearch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
