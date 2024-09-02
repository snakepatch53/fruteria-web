import { getSales } from "../services/sales";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Ventas() {
    const [ventas, setVentas] = useState(null);
    useEffect(() => {
        getSales().then((response) => {
            if (!response) return setVentas([]);
            setVentas(response);
        });
    }, []);

    return (
        <PageContent className="p-4 space-y-4 w-full ">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ventas?.map((row) => (
                    <Item key={row.id} row={row} to={"/panel/ventas/" + row.id} />
                ))}
                {ventas === null && (
                    <>
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                    </>
                )}
            </div>
        </PageContent>
    );
}

function Item({ row, to }) {
    const subtotal = parseFloat(row.total);
    const iva = parseFloat(subtotal * import.meta.env.VITE_IVA);
    const total = parseFloat(subtotal + iva);
    return (
        <Link
            to={to}
            className="flex flex-col w-full p-4 items-center rounded-lg bg-[--c2] shadow gap-4 overflow-hidden hover:scale-105 transition-all"
        >
            <div className="flex flex-col w-full py-1 items-center border rounded-md">
                <div className=" flex justify-center items-center rounded-full w-full max-w-20 aspect-square border-2 bg-[--c6] ">
                    <FontAwesomeIcon className=" text-2xl text-[--c6-txt] " icon={faUser} />
                </div>
                <h1>
                    <b>Cédula: </b>
                    {row?.customer?.cedula}
                </h1>
                <h1>
                    <b>Nombre: </b>
                    {row.customer?.name}
                </h1>
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex w-full justify-between ">
                    <div>Subtotal </div>
                    <div>$ {subtotal.toFixed(2)}</div>
                </div>
                <div className="flex w-full justify-between ">
                    <div>Iva </div>
                    <div>$ {iva.toFixed(2)}</div>
                </div>
                <div className="flex w-full justify-between ">
                    <span className="font-bold">Total</span>
                    <span className="text-green-600">$ {total.toFixed(2)}</span>
                </div>
            </div>
        </Link>
    );
}

function ItemSkeleton() {
    return (
        <div className=" flex flex-col items-center gap-3 w-full border shadow-md rounded-lg p-4 bg-black/5 animate-pulse ">
            <div className=" block w-full h-16 rounded-md border bg-black/5 " />
            <div className=" flex justify-between w-full ">
                <div className=" w-2/5 h-4 rounded-full bg-black/5 " />
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
            </div>
            <div className=" flex justify-between w-full ">
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
            </div>
            <div className=" flex justify-between w-full ">
                <div className=" w-2/5 h-4 rounded-full bg-black/5 " />
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
            </div>
        </div>
    );
}
