import Search from "./Search";
import OptionBar from "./OptionBar";
import LogoHeader from "./LogoHeader";

export default function DesktopHeader() {
    return (
        <header className=" hidden md:flex sticky top-0 z-10 h-24 px-[--p] bg-[--c2] shadow-sm  ">
            <div className=" container h-full justify-between ">
                <LogoHeader />

                <OptionBar classWrapp=" gap-5 " />

                <Search />
            </div>
        </header>
    );
}
