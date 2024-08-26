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
            </div>
            <h2 className=" font-bold text-[--c2-txt] ">Productos</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1">
                {products
                    ?.filter((p) => p.active)
                    ?.map((row) => (
                        <Item
                            key={row.id}
                            row={row}
                            onClick={() => handleCheckProduct(row)}
                            selectedProducts={combo?.combo_products}
                        />
                    ))}
            </div>

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </div>
    );
}

function ItemProduct({ row, updateQuantity, deleteProduct }) {
    return (
        <div className="flex flex-col xs:flex-row items-center justify-between p-2 md:px-8 border rounded-lg bg-[--c2] text-[--c2-txt] ">
            <div className=" flex-1 flex flex-col gap-1">
                <h3 className=" text-sm md:text-base uppercase font-bold leading-[15px] text-center xs:text-left md:text-center ">
                    {row?.product?.name}
                </h3>
                <div className="flex gap-3 items-center mt-2 mx-auto xs:mx-0 md:mx-auto ">
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
                className=" w-32 aspect-square object-contain "
            />
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
