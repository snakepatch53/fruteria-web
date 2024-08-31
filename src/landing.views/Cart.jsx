import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContent from "../components/PageContent";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/cart";
import { useContext, useState } from "react";

import { getCustomers, storageCustomer, updateCustomer } from "../services/customers";
import { isCedula } from "../lib/validations";
import { cls } from "../lib/utils";
import { storageSale } from "../services/sales";

export default function Cart() {
    const { products, combos, updateProductQuantity, updateComboQuantity } =
        useContext(CartContext);

    if (products === null || combos === null) return null;
    const subtotal =
        products.reduce((acc, product) => acc + product.price * product.quantity, 0) +
        combos.reduce((acc, combo) => acc + combo.price * combo.quantity, 0);

    const iva = subtotal * import.meta.env.VITE_IVA;
    const total = subtotal + iva;
    return (
        <PageContent className=" flex flex-col ">
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
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                </div>
            </div>
            <div className=" p-5 md:p-10 min-h-[100dvh] ">
                <div className=" container flex flex-col gap-5 ">
                    {products?.map((product) => (
                        <ItemProduct
                            key={product.id}
                            product={product}
                            updateQuantity={updateProductQuantity}
                        />
                    ))}

                    {combos?.map((combo) => (
                        <ItemCombo
                            key={combo.id}
                            combo={combo}
                            updateQuantity={updateComboQuantity}
                        />
                    ))}
                </div>
            </div>

            <div
                className=" sticky bottom-0 flex flex-col items-center gap-2 px-[--p] py-4 bg-[--c3] text-[--c3-txt] backdrop-blur-md "
                style={{
                    boxShadow: "0px -2px 10px 0px rgba(0,0,0,0.1)",
                }}
            >
                <div className=" flex justify-center gap-2  ">
                    <span className=" font-bold ">Subtotal: </span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className=" flex justify-center gap-2  ">
                    <span className=" font-bold ">IVA: </span>
                    <span>${iva.toFixed(2)}</span>
                </div>
                <div className=" flex justify-center gap-2  ">
                    <span className=" font-bold ">Total: </span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <ShopCartForm />
            </div>
        </PageContent>
    );
}

function ItemProduct({ product, updateQuantity }) {
    const subtotal = product.price * product.quantity;
    return (
        <div className="flex flex-col xs:flex-row items-center justify-between px-3 py-3 md:px-8 border rounded-lg ">
            <div className=" p-2 w-24 md:w-32 aspect-square ">
                <img
                    className=" w-full h-full object-contain  rounded-md "
                    src={product.image_url}
                    alt={product.name}
                />
            </div>
            <div className=" flex-1 flex flex-col gap-1">
                <h3 className=" text-sm md:text-base uppercase font-bold leading-[15px] text-center xs:text-left md:text-center ">
                    {product.name}
                </h3>
                <div className=" flex flex-col-reverse xs:flex-row ">
                    <div className=" flex-1 flex flex-col ">
                        <span className="opacity-70 text-xs md:text-base text-center xs:text-left md:text-center ">
                            ${product.price} / {product.sale_type}
                        </span>
                        <div className="flex gap-3 items-center mt-2 mx-auto xs:mx-0 md:mx-auto ">
                            <Button text="-" onClick={() => updateQuantity(product, false)} />
                            <span>{product.quantity}</span>
                            <Button text="+" onClick={() => updateQuantity(product)} />
                        </div>
                    </div>
                    <span className=" flex items-center text-base md:text-lg text-[--c2-txt2] text-center xs:text-left ">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function ItemCombo({ combo, updateQuantity }) {
    let products = combo.combo_products.map((comboProduct) => comboProduct.product);

    const subtotal = combo.price * combo.quantity;

    return (
        <div className="flex flex-col xs:flex-row items-center justify-between px-3 py-3 md:px-8 border rounded-lg ">
            <div className=" p-2 grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] w-full xs:w-24 md:w-32 ">
                {products.map((product) => (
                    <img
                        key={product.id}
                        className=" w-full object-contain  rounded-md "
                        src={product.image_url}
                        alt={product.name}
                    />
                ))}
            </div>
            <div className=" flex-1 flex flex-col gap-1">
                <h3 className=" text-sm md:text-base uppercase font-bold leading-[15px] text-center xs:text-left md:text-center ">
                    {combo.name}
                </h3>
                <div className=" flex flex-col-reverse xs:flex-row ">
                    <div className=" flex-1 flex flex-col ">
                        <span className="opacity-70 text-xs md:text-base text-center xs:text-left md:text-center ">
                            ${combo.price} / Unidad
                        </span>
                        <div className="flex gap-3 items-center mt-2 mx-auto xs:mx-0 md:mx-auto ">
                            <Button text="-" onClick={() => updateQuantity(combo, false)} />
                            <span>{combo.quantity}</span>
                            <Button text="+" onClick={() => updateQuantity(combo)} />
                        </div>
                    </div>
                    <span className=" flex items-center text-base md:text-lg text-[--c2-txt2] text-center xs:text-left ">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Button({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex bg-[--c4] text-[--c4-txt] text-center rounded-md w-10 aspect-square  items-center justify-center"
        >
            {text}
        </button>
    );
}

function ShopCartForm() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [cedula, setCedula] = useState("");
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const { combos, products, resetCart } = useContext(CartContext);

    const handleChangeCedula = (value) => {
        setCedula(value);
        if (!isCedula(value)) return setMessage("Cédula inválida");
        setMessage("");
        getCustomers().then((customers) => {
            setDisabled(false);
            const customer = customers.find((customer) => customer.cedula == value);
            if (!customer) return;
            setName(customer.name);
            setSelectedCustomer(customer);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let customer = null;
        if (!selectedCustomer) {
            // storage
            const resStorage = await storageCustomer({ cedula, name });
            if (!resStorage.success) return setMessage(resStorage.error);
            customer = resStorage.data;
        } else {
            // update
            const resUpdate = await updateCustomer(selectedCustomer.id, { cedula, name });
            if (!resUpdate.success) return setMessage(resUpdate.error);
            customer = resUpdate.data;
        }
        // insert sale and product_sales
        const res = await storageSale({
            customer_id: customer.id,
            product_sales: products.map((product) => ({
                product_id: product.id,
                quantity: product.quantity,
                price: product.price,
            })),
            combo_sales: combos.map((combo) => ({
                combo_id: combo.id,
                quantity: combo.quantity,
                price: combo.price,
            })),
        });

        resetCart();

        const urlSale = window.location.origin + "/venta/" + res.data.id;
        const wtp_message = `Hola 👋, me contacto desde tu tienda de frutas web 💻: \n\n*Nombre:* ${customer.name}\n*Asunto:* Gestion de carrito de compras 🎉\n*Url:* ${urlSale}`;
        const url = `https://api.whatsapp.com/send?phone=${
            import.meta.env.VITE_PHONE_NUMBER
        }&text=${wtp_message}`;
        const encodedUrl = encodeURI(url);
        window.open(encodedUrl, "_blank");
    };

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3 w-full max-w-64 text-center ">
            <ShopCartFormInput value={cedula} onChange={handleChangeCedula} placeholder="Cédula" />
            <ShopCartFormInput
                value={name}
                onChange={setName}
                placeholder="Nombre"
                disabled={disabled}
            />

            <span className=" flex justify-center items-center h-4 text-xs text-center text-red-600 ">
                {message}
            </span>

            <button
                type="submit"
                className=" border bg-[--c1] text-[--c1-txt] flex justify-center items-center gap-2 w-full max-w-64 rounded-lg p-3 text-center opacity-90 transition hover:scale-110 hover:opacity-100 "
            >
                Comprar
            </button>
        </form>
    );
}

function ShopCartFormInput({ value, onChange, placeholder, disabled }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cls(" border p-2 rounded w-full ", {
                " bg-black/10 ": disabled,
            })}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
