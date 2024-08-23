import LogoHeader from "./LogoHeader";
import Search from "./Search";

export default function MobileHeader() {
    return (
        <header className=" sticky top-0 z-10 md:hidden w-full h-20 bg-[--c1]">
            <div className="flex justify-between w-full h-full px-5 py-3 gap-5 items-center shadow-sm ">
                <LogoHeader />
                <Search classWrapp=" flex-1 max-w-96 " />
            </div>
        </header>
    );
}
