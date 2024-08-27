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
                <button
                    className=" relative flex items-center justify-center w-10 aspect-square bg-[--c2] text-[--c2-txt2] rounded-full "
                    type="button"
                >
                    <div className=" absolute -left-0 -top-1 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ">
                        {totalItems ? totalItems : 0}
                    </div>
                    <Link to="/cart" className=" flex justify-center items-center w-full h-full ">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                </button>
            </div>
        </header>
    );
}
