import Button from "../panel.components/crud/Button";
import { faCheck, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
// import CrudAvatar from "../panel.components/crud/crudAvatar";
import { cls } from "../lib/utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCombo } from "../services/combos";
import { getProducts } from "../services/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    destroyComboProduct,
    storageComboProduct,
    updateComboProduct,
} from "../services/comboProducts";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { showNotification } from "../components/Notification";

export default function ComboProducts() {
    const { id } = useParams();

    const [progress, setProgress] = useState(false);
    const [combo, setCombo] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    useEffect(() => {
        getCombo(id).then((data) => {
            setCombo(data);
        });
    }, [id]);

    const addProduct = (product) => {
        setProgress(true);
        storageComboProduct({
            combo_id: combo.id,
            product_id: product.id,
            quantity: 1,
            price: product.price,
        }).then((res) => {
            setProgress(false);
            if (!res?.success)
                return showNotification({
                    title: "Error desde el servidor",
                    message: res.message || "Error al agregar el producto al combo",
                    type: "danger",
                });

            const newCombo = { ...combo };
            newCombo.combo_products.push(res.data);
            setCombo(newCombo);
        });
    };

    const deleteProduct = (product) => {
        setProgress(true);
        destroyComboProduct(product.id).then((res) => {
            setProgress(false);
            if (!res?.success)
                return showNotification({
                    title: "Error desde el servidor",
                    message: res.message || "Error al eliminar el producto al combo",
                    type: "danger",
                });
            const newCombo = { ...combo };
            newCombo.combo_products = newCombo.combo_products.filter((p) => p.id !== product.id);
            setCombo(newCombo);
        });
    };

    const updateQuantity = (product, isAdd = true) => {
        setProgress(true);
        updateComboProduct(product.id, {
            quantity: isAdd ? product.quantity + 1 : product.quantity - 1,
        }).then((res) => {
            setProgress(false);
            if (!res?.success)
                return showNotification({
                    title: "Error desde el servidor",
                    message: res.message || "Error al actualizar la cantidad del producto",
                    type: "danger",
                });
            const newCombo = { ...combo };
            newCombo.combo_products = newCombo.combo_products.map((p) =>
                p.id === product.id ? res.data : p
            );
            setCombo(newCombo);
        });
    };

    const handleCheckProduct = (product) => {
        const isProduct = combo?.combo_products?.find((p) => p.product_id === product.id);
        if (isProduct) deleteProduct(isProduct);
        else addProduct(product);
    };

    return (
        <div className="p-4 space-y-4 w-full ">
            <h2 className=" font-bold text-[--c2-txt] ">
                Combo: <span className=" font-normal ">{combo?.name}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                {combo?.combo_products?.map((row) => (
                    <ItemProduct
                        key={row.id}
                        row={row}
                        updateQuantity={updateQuantity}
                        deleteProduct={deleteProduct}
                    />
                ))}
                {combo === null && (
                    <>
                        <ItemProductSkeleton classText=" w-32 " />
                        <ItemProductSkeleton classText=" w-20 " />
                        <ItemProductSkeleton classText=" w-28 " />
                        <ItemProductSkeleton classText=" w-16 " />
                    </>
                )}
            </div>
            <h2 className=" font-bold text-[--c2-txt] ">Agregar productos</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1">
                {products?.map((row) => (
                    <Item
                        key={row.id}
                        row={row}
                        onClick={() => handleCheckProduct(row)}
                        selectedProducts={combo?.combo_products}
                    />
                ))}
                {products === null && (
                    <>
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                    </>
                )}
            </div>

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </div>
    );
}

function ItemProduct({ row, updateQuantity, deleteProduct }) {
    return (
        <div className="flex items-center justify-between p-2 md:p-3 border rounded-lg bg-[--c2] text-[--c2-txt] ">
            <div className=" flex-1 flex flex-col gap-1">
                <h3 className=" text-sm md:text-base uppercase font-bold leading-[15px] ">
                    {row?.product?.name + " "}
                    <span
                        className={cls(
                            " w-full text-[10px] leading-[10px] text-center opacity-80 capitalize border px-2 py-[2px] rounded-full ",
                            {
                                "text-[#2f855a]": row?.product?.active,
                                "text-[#9b2c2c]": !row?.product?.active,
                            }
                        )}
                    >
                        {row?.product?.active ? "Activo" : "Inactivo"}
                    </span>
                </h3>
                <div className="flex gap-3 items-center mt-2 ">
                    <Button variant={2} icon={faPlus} onClick={() => updateQuantity(row)} />
                    <span>{row.quantity}</span>
                    <Button variant={2} icon={faMinus} onClick={() => updateQuantity(row, false)} />
                    <Button
                        classWrapp=" ml-3 "
                        variant={3}
                        icon={faTrash}
                        onClick={() => deleteProduct(row)}
                    />
                </div>
            </div>
            <img
                className=" h-16 aspect-square object-contain  rounded-md "
                src={row?.product?.image_url}
                alt={row?.product?.name}
            />
        </div>
    );
}

function ItemProductSkeleton({ classText = "" }) {
    return (
        <div className=" flex animate-pulse p-2 bg-black/5 rounded-lg ">
            <div className=" flex-1 flex flex-col gap-2 ">
                <div className=" flex items-center gap-2 ">
                    <span className={cls(" block w-20 h-6 bg-black/5 rounded-full ", classText)} />
                    <span className=" block w-10 h-4 bg-black/5 rounded-full " />
                </div>
                <div className=" flex items-center gap-2 ">
                    <div className=" block w-9 aspect-square bg-black/5 " />
                    <span className=" block w-7 h-6 bg-black/5 rounded-full " />
                    <div className=" block w-9 aspect-square bg-black/5 " />
                    <div className=" block w-9 aspect-square bg-black/5 ml-3 " />
                </div>
            </div>
            <div className=" block h-16 aspect-square rounded-full bg-black/5 " />
        </div>
    );
}

function Item({ row, onClick, selectedProducts }) {
    const isSelected = selectedProducts?.find((p) => p?.product?.id === row.id);
    return (
        <button
            onClick={onClick}
            type="button"
            className=" relative flex flex-col bg-[--c2] cursor-pointer group rounded-md "
        >
            <img
                src={row?.image_url}
                alt={row.name}
                className=" w-full p-1 aspect-square object-contain "
            />
            <span
                className={cls(" w-full text-[10px] leading-[10px] text-center opacity-80 ", {
                    "text-[#2f855a]": row?.active,
                    "text-[#9b2c2c]": !row?.active,
                })}
            >
                {row?.active ? "Activo" : "Inactivo"}
            </span>
            <span className=" w-full text-[10px] leading-[10px] text-center opacity-80 ">
                {row?.name}
            </span>
            <div className=" absolute top-1 left-1 flex justify-center items-center w-7 aspect-square border rounded bg-white/70 ">
                <FontAwesomeIcon
                    className={cls(" w-0 transition-all duration-300 group-hover:w-10 ", {
                        "w-10": isSelected,
                    })}
                    icon={faCheck}
                />
            </div>
        </button>
    );
}

function ItemSkeleton() {
    return (
        <div className=" flex flex-col gap-1 animate-pulse bg-black/5 rounded-md aspect-square p-2 ">
            <div className=" w-full aspect-square bg-black/5 rounded-full " />
            <span className=" w-1/2 h-2 bg-black/5 rounded-full mx-auto " />
            <span className=" w-full h-3 bg-black/5 rounded-full " />
        </div>
    );
}
