import {
    faAppleWhole,
    faBorderAll,
    faCarrot,
    faGift,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../lib/utils";

export default function OptionBar({
    classWrapp = "",
    classOption = "",
    classIcon = "",
    classText = "",
}) {
    return (
        <div className={cls(" flex gap-2 my-auto ", classWrapp)}>
            <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/"
                name="Todos"
                icon={faBorderAll}
            />
            <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/frutas"
                name="Frutas"
                icon={faAppleWhole}
            />
            <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/verduras"
                name="Verduras"
                icon={faCarrot}
            />
            <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/combos"
                name="Combos"
                icon={faGift}
            />
            <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/ofertas"
                name="Ofertas"
                icon={faStar}
            />
            {/* <Option
                classWrapp={cls("", classOption)}
                classIcon={cls("", classIcon)}
                classText={cls("", classText)}
                to="/cart"
                name="Carrito"
                icon={faCartShopping}
            >
                <span className=" absolute -left-3 -top-3 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ">
                    2
                </span>
            </Option> */}
        </div>
    );
}

function Option({
    children,
    to,
    name,
    icon,
    color,
    classWrapp = "",
    classIcon = "",
    classText = "",
}) {
    const { pathname } = useLocation();
    const isActive = pathname == to;
    return (
        <Link
            to={to || "#"}
            className={cls(
                " relative flex items-center gap-1 transition text-[--c2-txt] group ",
                "flex-col lg:flex-row",
                classWrapp,
                {
                    " text-[--c2-txt2] ": isActive,
                }
            )}
            style={{ color }}
        >
            <FontAwesomeIcon
                className={cls(" opacity-70 transition-all group-hover:opacity-100 ", classIcon, {
                    " opacity-100 ": isActive,
                })}
                icon={icon}
            />
            <span className={cls("  ", classText)}>{name}</span>
            {children ? children : null}
        </Link>
    );
}
