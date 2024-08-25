import { X } from "lucide-react";
import { useContext } from "react";
import { PanelContext } from "../contexts/panel";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../lib/utils";
import { SessionContext } from "../contexts/session";
export default function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useContext(PanelContext);
    const { logout } = useContext(SessionContext);
    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Menú</h2>
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className=" p-4 h-full ">
                    <ul className=" space-y-2 flex flex-col h-full ">
                        <Item text="Inicio" to="./" />
                        <Item text="Usuarios" to="./usuarios" />
                        <Item text="Clientes" to="./clientes" />
                        <Item text="Productos" to="./productos" />
                        <Item text="Ventas" to="./ventas" />
                        <Item tag="button" text="Cerrar Sesion" onClick={logout} />
                    </ul>
                </nav>
            </div>
        </>
    );
}

function Item({ classWrapp, tag = Link, to = "", text, ...props }) {
    const Tag = tag;

    const { pathname } = useLocation();
    const pathnameWithoutPanel = pathname.replace("/panel", "");
    const isActive = pathnameWithoutPanel === to.replace(".", "");
    return (
        <li className={cls("", classWrapp)}>
            <Tag
                to={to}
                className={cls(
                    "block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200 rounded",
                    {
                        "bg-gray-200": isActive,
                    }
                )}
                {...props}
            >
                {text}
            </Tag>
        </li>
    );
}
