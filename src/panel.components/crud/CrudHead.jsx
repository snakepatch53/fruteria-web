import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function CrudHead({ title, isOpen = false, onClickNew, handleSearch }) {
    if (!isOpen) return null;
    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className=" text-lg md:text-2xl font-bold">{title}</h2>
                <Button
                    onClick={onClickNew}
                    variant={2}
                    classWrapp=" md:h-11 aspect-square md:aspect-auto md:px-3 "
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="sr-only md:not-sr-only">Nuevo</span>
                </Button>
            </div>
            <div className="flex w-full  justify-center items-center rounded-lg px-5 py-2 border-2 bg-[--c2] text-[--c2-txt] ">
                <FontAwesomeIcon icon={faSearch} className="text-[--c2-txt3] " />
                <input
                    type="search"
                    placeholder="Buscar.."
                    className="flex w-full pl-4 bg-transparent"
                    onInput={handleSearch}
                />
            </div>
        </>
    );
}
