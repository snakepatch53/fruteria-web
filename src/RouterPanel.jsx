import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./panel.components/Sidebar";
import Header from "./panel.components/Header";
import BottomNavigation from "./panel.components/BottomNavigation";

const Home = lazy(() => import("./panel.views/Home"));
const Usuarios = lazy(() => import("./panel.views/Usuarios"));

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
                    </Routes>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
