import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/products";

// create context
export const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [categorySelected, setCategorySelected] = useState("all");
    const [filterProducts, setFilterProducts] = useState(null);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setFilterProducts(data);
        });
    }, []);

    useEffect(() => {
        if (products === null) return;
        setFilterProducts(
            products.filter(
                (product) =>
                    product?.category?.toLowerCase() === categorySelected.toLowerCase() ||
                    categorySelected === "all"
            )
        );
    }, [categorySelected, products]);

    const selectCategory = (category) => setCategorySelected(category);

    const filterBySearch = (search) => {
        setFilterProducts(
            products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) &&
                    (product?.category?.toLowerCase() === categorySelected ||
                        categorySelected === "all")
            )
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products: filterProducts,
                categorySelected,
                setProducts,
                selectCategory,
                filterBySearch,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
