import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../lib/utils";
import { useContext } from "react";
import { ProductContext } from "../contexts/products";

export default function Search({ classWrapp = "" }) {
    const { filterBySearch } = useContext(ProductContext);
    return (
        <div
            className={cls(
                " flex items-center my-auto bg-[--c2] p-2 rounded-md border ",
                classWrapp
            )}
        >
            <input
                className=" bg-transparent flex-1 "
                type="text"
                placeholder=" Buscar.. "
                onChange={(e) => filterBySearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
        </div>
    );
}
