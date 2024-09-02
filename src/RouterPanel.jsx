import { lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./panel.components/Sidebar";
import Header from "./panel.components/Header";
import BottomNavigation from "./panel.components/BottomNavigation";
import ComboProducts from "./panel.views/ComboProducts";
import { PanelContext } from "./contexts/panel";
import { cls } from "./lib/utils";

const Home = lazy(() => import("./panel.views/Home"));
const Usuarios = lazy(() => import("./panel.views/Usuarios"));
const Productos = lazy(() => import("./panel.views/Productos"));
const Combos = lazy(() => import("./panel.views/Combos"));
const Ventas = lazy(() => import("./panel.views/Ventas"));
const Venta = lazy(() => import("./panel.views/Venta"));
const Clientes = lazy(() => import("./panel.views/Clientes"));

export default function RouterPanel() {
    const { isSidebarOpen } = useContext(PanelContext);

    return (
        <div
            className={cls(
                " grid grid-cols-1 bg-[--c5] text-[--c5-txt] transition-all ",
                " lg:grid-cols-[200px_1fr] ",
                {
                    " lg:grid-cols-[0px_1fr] ": isSidebarOpen,
                }
            )}
        >
            <Header />
            <Sidebar />
            <main className=" px-4 sm:px-6 min-h-[100dvh] w-full ">
                <div className=" container ">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/combos" element={<Combos />} />
                        <Route path="/combos/:id" element={<ComboProducts />} />
                        <Route path="/ventas" element={<Ventas />} />
                        <Route path="/ventas/:id" element={<Venta />} />
                        <Route path="/clientes" element={<Clientes />} />
                    </Routes>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
