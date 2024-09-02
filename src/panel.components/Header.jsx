import { Menu } from "lucide-react";
import { useContext } from "react";
import { PanelContext } from "../contexts/panel";
import { SessionContext } from "../contexts/session";
import CrudAvatar from "./crud/crudAvatar";
export default function Header() {
    const { toggleSidebar } = useContext(PanelContext);
    const { session } = useContext(SessionContext);
    return (
        <header className=" sticky top-0 z-20 lg:col-span-2 shadow-sm px-[--p] bg-[--c1] text-[--c1-txt] ">
            <div className=" mx-auto py-4 px-2 flex justify-between items-center">
                <div className=" flex items-center gap-1 ">
                    <CrudAvatar name={session.name} />
                    <h1 className="text-lg font-semibold ">{session.name}</h1>
                </div>
                <button
                    onClick={toggleSidebar}
                    className=" opacity-70 transition hover:opacity-100 "
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}
