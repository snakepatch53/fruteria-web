import { Route, Routes } from "react-router-dom";
import Desktop from "./landing.views/Desktop";
import Shop from "./landing.views/Shop";
import Cart from "./landing.views/Cart";

export default function RouterLanding() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Shop category="all" />} />
                <Route path="/frutas" element={<Shop category="frutas" />} />
                <Route path="/verduras" element={<Shop category="verduras" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/desktop" element={<Desktop />} />
            </Routes>
        </>
    );
}
