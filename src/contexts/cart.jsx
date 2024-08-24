import { createContext, useEffect, useState } from "react";

// create context
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [combos, setCombos] = useState(null);

    useEffect(() => {
        const _products = JSON.parse(localStorage.getItem("products"));
        const _combos = JSON.parse(localStorage.getItem("combos"));
        setProducts(_products || []);
        setCombos(_combos || []);
    }, []);

    useEffect(() => localStorage.setItem("products", JSON.stringify(products)), [products]);
    useEffect(() => localStorage.setItem("combos", JSON.stringify(combos)), [combos]);

    const addProduct = (product) => {
        const index = products.findIndex((p) => p.id === product.id);
        if (index !== -1) return updateProductQuantity(product);
        setProducts([...products, { quantity: 1, ...product }]);
    };

    const addCombo = (combo) => {
        const index = combos.findIndex((c) => c.id === combo.id);
        if (index !== -1) return updateComboQuantity(combo);
        setCombos([...combos, { quantity: 1, ...combo }]);
    };

    const updateProductQuantity = (product, isIncrement = true) => {
        const index = products.findIndex((p) => p.id === product.id);
        const newProducts = [...products];
        newProducts[index].quantity = isIncrement
            ? newProducts[index].quantity + 1
            : newProducts[index].quantity - 1;
        if (newProducts[index].quantity <= 0) newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const updateComboQuantity = (combo, isIncrement = true) => {
        const index = combos.findIndex((c) => c.id === combo.id);
        const newCombos = [...combos];
        newCombos[index].quantity = isIncrement
            ? newCombos[index].quantity + 1
            : newCombos[index].quantity - 1;
        if (newCombos[index].quantity <= 0) newCombos.splice(index, 1);
        setCombos(newCombos);
    };

    return (
        <CartContext.Provider
            value={{
                products,
                combos,

                addProduct,
                addCombo,

                updateProductQuantity,
                updateComboQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
