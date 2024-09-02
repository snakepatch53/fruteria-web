import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./panel.components/Sidebar";
import Header from "./panel.components/Header";
import BottomNavigation from "./panel.components/BottomNavigation";
import ComboProducts from "./panel.views/ComboProducts";

const Home = lazy(() => import("./panel.views/Home"));
const Usuarios = lazy(() => import("./panel.views/Usuarios"));
const Productos = lazy(() => import("./panel.views/Productos"));
const Combos = lazy(() => import("./panel.views/Combos"));
const Ventas = lazy(() => import("./panel.views/Ventas"));
const Venta = lazy(() => import("./panel.views/Venta"));
const Clientes = lazy(() => import("./panel.views/Clientes"));

export default function RouterPanel() {
    return (
        <div className=" grid  bg-[--c5] text-[--c5-txt] ">
            <Header />
            <div className=" flex ">
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
            </div>
            <BottomNavigation />
        </div>
    );
}
