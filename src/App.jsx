import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RouterLanding from "./RouterLanding";
import RouterPanel from "./RouterPanel";
import { ProductProvider } from "./contexts/products";
import { ComboProvider } from "./contexts/combos";
import { CartProvider } from "./contexts/cart";
import { PanelProvider } from "./contexts/panel";
import { Notification } from "./components/Notification";
import AuthGuard from "./guards/AuthGuard";
import SessionOutGuard from "./guards/SessionOutGuard";
import { Suspense } from "react";
import Loading from "./views/Loading";

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Notification />
                <Routes>
                    <Route element={<SessionOutGuard />}>
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
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route
                            path="/panel/*"
                            element={
                                <PanelProvider>
                                    <RouterPanel />
                                </PanelProvider>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
