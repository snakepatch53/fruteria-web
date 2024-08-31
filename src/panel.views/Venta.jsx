import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSale } from "../services/sales";
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
        <PageContent className=" space-y-4 w-full bg-[--c5] text-[--c5-txt] min-h-screen ">
            <div className=" px-[--p] ">
                <div className=" container p-3 justify-center ">
                    {Object.keys(venta).length === 0 && (
                        <p className=" text-center mx-auto ">El recibo no existe</p>
                    )}
                    <Receipt venta={venta} />
                </div>
            </div>
        </PageContent>
    );
}
