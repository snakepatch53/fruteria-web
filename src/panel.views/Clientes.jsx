import { getCustomers } from "../services/customers";
import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Clientes() {
    const [clientes, setClientes] = useState(null);
    useEffect(() => {
        getCustomers().then((response) => {
            if (!response) return setClientes([]);
            setClientes(response);
        });
    }, []);

    return (
        <PageContent className="p-4 space-y-4 w-full ">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {clientes?.map((row) => (
                    <Item key={row.id} row={row} />
                ))}
                {clientes === null && (
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

function Item({ row }) {
    return (
        <div className="flex flex-col w-full p-4 items-center rounded-lg bg-[--c2] shadow overflow-hidden hover:scale-105 transition-all">
            <div className="flex flex-col w-full py-1 items-center border rounded-md ">
                <div className="p-4">
                    <FontAwesomeIcon icon={faCircleUser} className="size-20 " />
                </div>
                <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold">Cedula</h1>
                    <span className="italic">{row.cedula}</span>
                </div>
                <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold">Nombre</h1>
                    <span className="italic">{row.name}</span>
                </div>
            </div>
        </div>
    );
}

function ItemSkeleton() {
    return (
        <div className=" flex flex-col items-center gap-1 w-full border shadow-md rounded-lg p-4 bg-black/5 animate-pulse ">
            <div className="flex  p-4">
                <div className="w-20 h-20  rounded-full bg-black/5" />
            </div>
            <div className=" w-2/4 h-5 rounded-full bg-black/5 " />
            <div className=" w-2/3 h-5 rounded-full bg-black/5 " />
            <div className=" w-2/4 h-5 rounded-full bg-black/5 " />
            <div className=" w-2/3 h-5 rounded-full bg-black/5 " />
        </div>
    );
}
