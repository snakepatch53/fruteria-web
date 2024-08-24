import Search from "./Search";
import OptionBar from "./OptionBar";
import LogoHeader from "./LogoHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export default function DesktopHeader() {
    const { products, combos } = useContext(CartContext);
    const totalItems = products?.length + combos?.length;
    return (
        <header className=" hidden lg:flex sticky top-0 z-10 h-24 px-[--p] bg-[--c2] shadow-sm  ">
            <div className=" container h-full justify-between ">
                <LogoHeader />

                <OptionBar classWrapp=" gap-5 " />

                <Search />
                <Link
                    to="/cart"
                    className=" relative flex items-center justify-center w-12 aspect-square my-auto border-2 text-[--c2-txt2] rounded-full"
                >
                    <span className=" absolute left-0 top-0 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ">
                        {totalItems}
                    </span>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>
        </header>
    );
}
