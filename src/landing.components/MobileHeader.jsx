import { Link } from "react-router-dom";
import LogoHeader from "./LogoHeader";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export default function MobileHeader() {
    const { products, combos } = useContext(CartContext);
    const totalItems = products?.length + combos?.length;
    return (
        <header className=" sticky top-0 z-10 lg:hidden w-full h-20 bg-[--c1]">
            <div className="flex justify-between w-full h-full px-5 py-3 gap-3 items-center shadow-sm ">
                <LogoHeader />
                <Search classWrapp=" flex-1 max-w-96 " />
                <Link
                    to="/cart"
                    className=" relative flex items-center justify-center w-10 aspect-square bg-[--c2] text-[--c2-txt2] rounded-full"
                >
                    <span className=" absolute -left-0 -top-1 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ">
                        {totalItems}
                    </span>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>
        </header>
    );
}
