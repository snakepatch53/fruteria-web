import { Home, Boxes, Box, BadgeDollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../lib/utils";
export default function BottomNavigation() {
    return (
        <nav className=" sticky bottom-0 z-10 bg-[--c2] text-[--c2-txt] shadow-lg lg:hidden ">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex justify-around">
                    <Item text="Inicio" to="./" icon={Home} />
                    <Item text="Productos" to="./productos" icon={Box} />
                    <Item text="Combos" to="./combos" icon={Boxes} />
                    <Item text="Ventas" to="./ventas" icon={BadgeDollarSign} />
                </div>
            </div>
        </nav>
    );
}

function Item({ tag = Link, text, to, icon, ...props }) {
    const Tag = tag;
    const Icon = icon;

    const { pathname } = useLocation();
    const pathnameWithoutPanel = pathname.replace("/panel", "");
    const isActive = pathnameWithoutPanel === to.replace(".", "");
    return (
        <Tag
            to={to}
            className={cls("flex flex-col items-center py-2 px-3 text-xs ", {
                " text-[--c2-txt2] ": isActive,
                " text-[--c2-txt3] ": !isActive,
            })}
            {...props}
        >
            <Icon />
            {text}
        </Tag>
    );
}
