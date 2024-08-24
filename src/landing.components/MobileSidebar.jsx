import OptionBar from "./OptionBar";

export default function MobileSidebar() {
    return (
        <div
            style={{
                boxShadow: "0px -5px 5px 0px rgba(0,0,0,.05)",
            }}
            className=" lg:hidden sticky bottom-0 flex w-full py-2 justify-center bg-[--c2] "
        >
            <OptionBar
                classWrapp=" gap-5 justify-evenly w-full "
                classIcon=" text-xl "
                classText=" text-xs "
            />
        </div>
    );
}
