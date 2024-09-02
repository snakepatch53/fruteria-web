import { X } from "lucide-react";
import { useContext } from "react";
import { PanelContext } from "../contexts/panel";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../lib/utils";
import { SessionContext } from "../contexts/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxes,
    faBoxOpen,
    faHome,
    faSackDollar,
    faUsers,
    faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useContext(PanelContext);
    const { logout } = useContext(SessionContext);
    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden "
                    onClick={toggleSidebar}
                />
            )}
            <div
                className={cls(
                    " fixed inset-y-0 left-0 z-30 flex flex-col w-48 h-[100dvh] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ",
                    " lg:sticky lg:top-[75px] lg:left-0 lg:z-10 lg:h-[calc(100dvh-75px)] lg:w-full lg:shadow-none lg:overflow-hidden lg:transition-all ",
                    {
                        "-translate-x-full": !isSidebarOpen,
                        "translate-x-0": isSidebarOpen,

                        " lg:translate-x-0 ": isSidebarOpen,
                        " lg:-translate-x-0 ": !isSidebarOpen,
                    }
                )}
            >
                <div className="flex justify-between items-center p-4 border-b lg:hidden ">
                    <h2 className="text-lg font-semibold">Menú</h2>
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className=" flex-1 p-4 ">
                    <ul className=" flex flex-col gap-2 h-full ">
                        <Item icon={faHome} text="Inicio" to="./" />
                        <Item icon={faUsersCog} text="Usuarios" to="./usuarios" />
                        <Item icon={faUsers} text="Clientes" to="./clientes" />
                        <Item icon={faBoxOpen} text="Productos" to="./productos" />
                        <Item icon={faBoxes} text="Combos" to="./combos" />
                        <Item icon={faSackDollar} text="Ventas" to="./ventas" />
                        <Item
                            classWrapp=" mt-auto rounded "
                            className=" justify-center text-center bg-[--c1] hover:bg-[--c1] text-[--c1-txt] hover:opacity-80 transition w-full "
                            tag="button"
                            text="Cerrar Sesion"
                            onClick={logout}
                        />
                    </ul>
                </nav>
            </div>
        </>
    );
}

function Item({ classWrapp, tag = Link, to = "", text, icon = null, ...props }) {
    const Tag = tag;

    const { pathname } = useLocation();
    const pathnameWithoutPanel = pathname.replace("/panel", "");
    const isActive = pathnameWithoutPanel === to.replace(".", "");
    return (
        <li className={cls("", classWrapp)}>
            <Tag
                to={to}
                {...props}
                className={cls(
                    " flex items-center gap-1 w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200 rounded",
                    props.className,
                    {
                        "bg-gray-200": isActive,
                    }
                )}
            >
                {icon && <FontAwesomeIcon className=" text-sm " icon={icon} />}
                {text}
            </Tag>
        </li>
    );
}
