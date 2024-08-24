import { useContext, useEffect } from "react";
import PageContent from "../components/PageContent";
import MobileHeader from "../landing.components/MobileHeader";
import DesktopHeader from "../landing.components/DesktopHeader";
import MobileSidebar from "../landing.components/MobileSidebar";
import { ProductContext } from "../contexts/products";
import { ComboContext } from "../contexts/combos";
import { cls } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../contexts/cart";
export default function Shop({ category = "all", filterCombos = false, filterOffers = false }) {
    const { products, selectCategory } = useContext(ProductContext);
    const { combos } = useContext(ComboContext);

    useEffect(() => {
        selectCategory(category);
    }, [category, selectCategory]);

    return (
        <PageContent>
            <MobileHeader />
            <DesktopHeader />
            <div className=" p-10 min-h-[100dvh] ">
                <div className=" container grid gap-5 md:gap-10 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {category == "all" &&
                        !filterOffers &&
                        combos?.map((combo) => <ItemCombo key={combo.id} combo={combo} />)}
                    {!filterCombos &&
                        products?.map((product) => {
                            if (filterOffers && !product.offer) return null;
                            return <ItemProduct key={product.id} product={product} />;
                        })}
                </div>
            </div>
            <MobileSidebar />
        </PageContent>
    );
}

function ItemCombo({ combo }) {
    const { addCombo } = useContext(CartContext);
    if (!combo?.combo_products?.length > 0) return null;
    let products = combo.combo_products.map((comboProduct) => comboProduct.product);

    if (products.length >= 4) products = products.slice(0, 4);
    if (products.length >= 2) products = products.slice(0, 2);
    if (products.length < 2) products = products.slice(0, 1);

    return (
        <button
            key={combo.id}
            onClick={() => addCombo(combo)}
            className=" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group "
        >
            <span className=" absolute top-2 -left-6 -rotate-45 w-24 text-center bg-[--c4] text-[--c4-txt] text-[10px] px-2 py-1 rounded">
                Combo
            </span>
            <div
                className={cls(
                    "flex-1 grid grid-cols-2 gap-2 aspect-square bg-[--c1] rounded-2xl p-5 ",
                    {
                        " grid-cols-2  ": products.length > 1,
                    }
                )}
            >
                {products.map((product) => (
                    <div key={product.id}>
                        <img
                            key={product.id}
                            className=" object-contain aspect-square md:grayscale-[.8] transition group-hover:grayscale-0  "
                            src={product.image_url}
                            alt={"Imagen de " + product.name}
                        />
                    </div>
                ))}
            </div>
            <div className=" gap-2 w-full text-sm ">
                <h2 className=" text-center text-black/50 ">{combo.name}</h2>
                <p className=" text-center  ">{combo.description}</p>
                <p className=" text-center  ">${combo.price}</p>
            </div>
        </button>
    );
}

function ItemProduct({ product }) {
    const { addProduct } = useContext(CartContext);
    const isOffer = product.offer;
    return (
        <button
            key={product.id}
            onClick={() => addProduct(product)}
            className=" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group "
        >
            {!!isOffer && (
                <span className=" absolute top-2 -left-6 -rotate-45 w-24 text-center bg-red-400 text-white text-[10px] px-2 py-1 rounded ">
                    <FontAwesomeIcon icon={faStar} /> Oferta
                </span>
            )}
            <div className="flex-1 aspect-square bg-[--c1] rounded-2xl p-5 ">
                <img
                    className=" w-full h-full object-contain md:grayscale-[.8] transition group-hover:grayscale-0  "
                    src={product.image_url}
                    alt={"Imagen de " + product.name}
                />
            </div>
            <div className=" gap-2 w-full text-sm ">
                <h2 className=" text-center text-black/50 ">
                    {product.name} / {product.category}
                </h2>
                <p className=" text-center  ">
                    ${product.price}/{product.sale_type}
                </p>
            </div>
        </button>
    );
}
