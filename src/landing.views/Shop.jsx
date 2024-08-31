import { useContext, useEffect } from "react";
import PageContent from "../components/PageContent";
import MobileHeader from "../landing.components/MobileHeader";
import DesktopHeader from "../landing.components/DesktopHeader";
import MobileSidebar from "../landing.components/MobileSidebar";
import { ProductContext } from "../contexts/products";
import { ComboContext } from "../contexts/combos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../contexts/cart";
import { cls } from "../lib/utils";
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
            <div className=" flex flex-col gap-5 p-10 min-h-[100dvh] ">
                <div className=" container grid gap-5 md:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {category == "all" &&
                        !filterOffers &&
                        combos?.map((combo) => <ItemCombo key={combo.id} combo={combo} />)}
                    {category == "all" && !filterOffers && combos === null && (
                        <>
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                        </>
                    )}
                </div>
                <div className=" container grid gap-5 md:gap-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
                    {!filterCombos &&
                        products?.map((product) => {
                            if (filterOffers && !product.offer) return null;
                            return <ItemProduct key={product.id} product={product} />;
                        })}
                    {!filterCombos && products === null && (
                        <>
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                        </>
                    )}
                </div>
            </div>
            <MobileSidebar />
        </PageContent>
    );
}

function ItemCombo({ combo }) {
    const { addCombo, combos } = useContext(CartContext);

    if (!combo?.combo_products?.length > 0) return null;
    let products = combo.combo_products.map((comboProduct) => comboProduct.product);

    const isSelected = combos.find((item) => item.id === combo.id);

    return (
        <button
            key={combo.id}
            onClick={() => addCombo(combo)}
            className=" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group "
        >
            <ProductInCart show={isSelected} text={isSelected?.quantity} />
            <span className=" absolute z-10 top-2 -left-6 -rotate-45 w-24 text-center bg-[--c4] text-[--c4-txt] text-[10px] px-2 py-1 rounded">
                Combo
            </span>
            <div
                className={cls(
                    "flex-1 grid grid-cols-[repeat(auto-fit,minmax(65px,1fr))] w-full min-h-36 gap-2 bg-[--c1] rounded-2xl p-5 ",
                    {
                        " opacity-70 ": isSelected,
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
                        <span className=" block text-[11px] leading-[11px] text-center opacity-60 ">
                            {product.name}
                        </span>
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
    const { addProduct, products } = useContext(CartContext);
    const isOffer = product.offer;
    const isSelected = products.find((item) => item.id === product.id);
    return (
        <button
            key={product.id}
            onClick={() => addProduct(product)}
            className=" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group "
        >
            <ProductInCart show={isSelected} text={isSelected?.quantity} />
            {!!isOffer && (
                <span className=" absolute z-10 top-2 -left-6 -rotate-45 w-24 text-center bg-red-400 text-white text-[10px] px-2 py-1 rounded ">
                    <FontAwesomeIcon icon={faStar} /> Oferta
                </span>
            )}
            <div
                className={cls("flex-1 aspect-square bg-[--c1] rounded-2xl p-5 ", {
                    " opacity-70 ": isSelected,
                })}
            >
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

function ItemSkeleton() {
    return (
        <div className=" flex flex-col bg-black/10 rounded-3xl p-5 animate-pulse gap-1">
            <div className=" block w-full aspect-square rounded-2xl border bg-black/5 " />
            <div className="flex flex-col items-center ">
                <div className="w-full flex flex-col gap-2 items-center">
                    <span className=" h-4 w-full max-w-48 bg-black/5 rounded-full" />
                    <span className="h-4 w-full max-w-20 bg-black/5 rounded-full" />
                    <span className="h-4 w-full max-w-28 bg-black/5 rounded-full" />
                </div>
            </div>
        </div>
    );
}

function ProductInCart({ show, text }) {
    return (
        <div
            className={cls(
                " absolute z-10 top-2 right-2 hidden h-12 aspect-square rounded-full bg-[--c2] text-[--c2-txt2] text-lg border shadow ",
                {
                    " flex ": show,
                }
            )}
        >
            <div className=" relative flex justify-center items-center w-full h-full ">
                <div className=" absolute -left-1 top-0 flex justify-center items-center h-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ">
                    {text}
                </div>
                <FontAwesomeIcon icon={faShoppingCart} />
            </div>
        </div>
    );
}
