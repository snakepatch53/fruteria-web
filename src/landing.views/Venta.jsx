import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSale } from "../services/sales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFile } from "@fortawesome/free-solid-svg-icons";
import PageContent from "../components/PageContent";
import Loading from "../views/Loading";
import Receipt from "../components/Receipt";

export default function Venta() {
    const { id } = useParams();
    const [venta, setVenta] = useState(null);

    useEffect(() => {
        getSale(id).then((response) => {
            if (!response) return setVenta({});
            setVenta(response);
        });
    }, [id]);

    if (venta === null) return <Loading />;
    return (
        <PageContent className=" flex flex-col bg-[--c5] text-[--c5-txt] min-h-screen ">
            <div className=" sticky top-0 z-10 flex items-center px-[--p] h-20 bg-[--c1] text-[--c1-txt] ">
                <div className=" container justify-between items-center ">
                    <Link
                        to="/"
                        className=" flex items-center gap-2 p-4  rounded-full transition duration-300 ease-in-out transform hover:scale-105  hover:bg-black/10 "
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Volver a la Tienda</span>
                    </Link>
                    <div className=" flex p-4 bg-[--c2] rounded-full text-[--c2-txt2] opacity-80 ">
                        <FontAwesomeIcon icon={faFile} />
                    </div>
                </div>
            </div>
            <div className=" px-[--p] ">
                <div className=" container p-3 ">
                    {Object.keys(venta).length === 0 && (
                        <p className=" text-center mx-auto ">El recibo no existe</p>
                    )}
                    <Receipt venta={venta} />
                </div>
            </div>
        </PageContent>
    );
}
