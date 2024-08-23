import { useContext, useEffect, useRef } from "react";
import PageContent from "../components/PageContent";
import { CartContext } from "../contexts/cart";
import MobileHeader from "../landing.components/MobileHeader";
import DesktopHeader from "../landing.components/DesktopHeader";
import MobileSidebar from "../landing.components/MobileSidebar";
export default function Shop({ category = null }) {
    const { products, selectCategory } = useContext(CartContext);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (products === null) return;
        selectCategory(category);
    }, [category]); // eslint-disable-line

    useEffect(() => {
        if (products === null) return;
        if (!isFirstRender.current) return;
        selectCategory(category);
        if (isFirstRender.current) isFirstRender.current = false;
    }, [products]); // eslint-disable-line

    return (
        <PageContent>
            <MobileHeader />
            <DesktopHeader />
            <div className=" p-10 min-h-[100dvh] ">
                <div className=" container grid gap-5 md:gap-10 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {products?.map((product) => (
                        <button
                            key={product.id}
                            className=" flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group "
                        >
                            <div className="flex-1 aspect-square bg-[--c1] rounded-2xl p-5 ">
                                <img
                                    className=" w-full h-full object-contain md:grayscale-[.8] transition group-hover:grayscale-0  "
                                    src={"/product_img/" + product.img}
                                    alt={"Imagen de " + product.name}
                                />
                            </div>
                            <div className=" gap-2 w-full text-sm ">
                                <h2 className=" text-center text-black/50 ">{product.name}</h2>
                                <p className=" text-center  ">
                                    ${product.price}/{product.sale_type}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <MobileSidebar />
        </PageContent>
    );
}
