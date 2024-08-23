export default function LogoHeader() {
    return (
        <div className=" flex h-full items-center p-3 ">
            <img
                className=" h-full aspect-square object-contain "
                src="/logo.png"
                alt="Logo de Fruteria"
            />
            <h1 className=" hidden sm:block text-2xl font-bold text-[--c1-txt] ">Fruteria</h1>
        </div>
    );
}
