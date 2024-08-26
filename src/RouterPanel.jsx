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

export default function RouterPanel() {
    return (
        <div className=" grid  bg-[--c5] text-[--c5-txt] ">
            <Sidebar />
            <Header />
            <main className=" px-4 sm:px-6 min-h-[100dvh] ">
                <div className=" container ">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/combos" element={<Combos />} />
                        <Route path="/combos/:id" element={<ComboProducts />} />
                    </Routes>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
