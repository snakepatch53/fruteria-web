import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RouterLanding from "./RouterLanding";
import RouterPanel from "./RouterPanel";
import { ProductProvider } from "./contexts/products";
import { ComboProvider } from "./contexts/combos";
import { CartProvider } from "./contexts/cart";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <CartProvider>
                            <ProductProvider>
                                <ComboProvider>
                                    <RouterLanding />
                                </ComboProvider>
                            </ProductProvider>
                        </CartProvider>
                    }
                />
                <Route path="/panel/*" element={<RouterPanel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
