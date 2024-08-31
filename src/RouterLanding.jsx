import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Venta from "./landing.views/Venta";

const Shop = lazy(() => import("./landing.views/Shop"));
const Login = lazy(() => import("./views/Login"));
const Cart = lazy(() => import("./landing.views/Cart"));

export default function RouterLanding() {
    return (
        <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/frutas" element={<Shop category="frutas" />} />
            <Route path="/verduras" element={<Shop category="verduras" />} />
            <Route path="/combos" element={<Shop filterCombos />} />
            <Route path="/ofertas" element={<Shop filterOffers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/venta/:id" element={<Venta />} />
        </Routes>
    );
}
