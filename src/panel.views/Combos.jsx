import Button from "../panel.components/crud/Button";
import { faBox, faPenToSquare, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { CrudForm } from "../panel.components/crud/CrudForm";
import CrudHead from "../panel.components/crud/CrudHead";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import useCrudPanel from "../hooks/useCrudPanel";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { cls } from "../lib/utils";
import { destroyCombo, getCombos, storageCombo, updateCombo } from "../services/combos";
import { Link } from "react-router-dom";

export default function Combos() {
    const {
        entityName,
        pluralEntityName,
        head,
        table,
        form,
        confirm,
        progress,
        datalist,
        $form,
        handleModeNew,
        handleModeEdit,
        handleModeDelete,
        hanleCancel,
        handleSubmit,
        handleDelete,
        handleSearch,
    } = useCrudPanel({
        entityName: "Combo",
        pluralEntityName: "Combos",
        searchFields: ["name", "price"],
        crudGet: getCombos,
        crudStorage: storageCombo,
        crudUpdate: updateCombo,
        crudDestroy: destroyCombo,
    });

    return (
        <div className="p-4 space-y-4 w-full ">
            <CrudHead
                title={pluralEntityName}
                // isOpen
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                handleSearch={handleSearch}
            />
            {table && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {datalist
                        ?.sort((a, b) => b.active - a.active)
                        ?.map((row) => (
                            <Item
                                key={row.id}
                                row={row}
                                onEdit={() => handleModeEdit(row)}
                                onDelete={() => handleModeDelete(row)}
                            />
                        ))}
                </div>
            )}
            <CrudForm
                title={entityName}
                // isOpen={true}
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
            >
                <CrudFormInput label="Nombre" name="name" placeholder="Nombre del combo" required />
                <CrudFormInput
                    label="Precio"
                    name="price"
                    type="number"
                    placeholder="Escriba unprecio para el combo"
                    required
                />
                <CrudFormInput
                    name="active"
                    label="Activo"
                    type="radio"
                    radioOptions={[
                        { value: 1, label: "si", checked: true },
                        { value: 0, label: "no" },
                    ]}
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                // isOpen={false}
                text="¿Estás seguro de eliminar este usuario?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />
            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </div>
    );
}

function Item({ row, onEdit, onDelete }) {
    const products = row.combo_products?.map((product) => product.product);
    return (
        <div className=" flex flex-col items-center gap-2 p-4 border rounded-lg shadow bg-[--c2] text-[--c2-txt] ">
            {products?.length > 0 ? (
                <div className=" flex-1 grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] w-full gap-1 p-2 border rounded-lg ">
                    {products.map((product) => (
                        <img
                            key={product.id}
                            src={product.image_url}
                            alt={product.name}
                            className="w-full aspect-square object-contain rounded-full"
                        />
                    ))}
                </div>
            ) : (
                <p className=" w-full text-center px-2 py-5 border rounded-lg bg-black/5">
                    No hay productos en este combo
                </p>
            )}
            <div className=" min-w-0">
                <p className="text-sm text-center font-medium text-[--c2-txt] truncate">
                    {row.name}
                </p>

                <p className=" text-sm text-center text-[--c2-txt3] truncate ">
                    ${row.price} / Unidad
                </p>
                <p className=" text-sm text-center text-[--c2-txt3] truncate ">{row.category}</p>
                <p
                    className={cls("text-xs text-center ", {
                        " text-red-600 ": row.active !== 1,
                        " text-green-600 ": row.active === 1,
                    })}
                >
                    {row.active === 1 ? "Activo" : "Inactivo"}
                </p>
            </div>
            <div className=" flex flex-shrink-0 ">
                <Button tag={Link} to={"/panel/combos/" + row.id} icon={faBox} />
                <Button onClick={onEdit} icon={faPenToSquare} />
                <Button onClick={onDelete} icon={faTrash} />
            </div>
        </div>
    );
}

// function ProductRecors({ products, name, isOpenForm = false }) {
//     const inputRef = useRef(null);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     useEffect(() => {
//         setTimeout(() => {
//             if (!inputRef?.current) return;
//             const input = inputRef.current;
//             if (!input.value) return;
//             const value = JSON.parse(input.value);
//             if (!value) return setSelectedProducts([]);
//             const _products = value.map((product) => product.product);
//             setSelectedProducts(_products);
//         }, 100);
//     }, [isOpenForm]);

//     useEffect(() => {
//         inputRef.current.value = JSON.stringify(selectedProducts);
//     }, [selectedProducts]);

//     return (
//         <div className=" grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2 ">
//             <input
//                 ref={inputRef}
//                 type="text"
//                 name={name}
//                 onInput={(e) => {
//                     console.log("mutation");
//                     console.log(e.target.value);
//                 }}
//                 hidden
//             />
//             {/* <input type="text" name={name} /> */}
//             {products &&
//                 products.map((product) => {
//                     return (
//                         <div
//                             key={product.id}
//                             className=" relative flex flex-col justify-center items-center gap-2 border p-1 select-none "
//                         >
//                             <input
//                                 type="checkbox"
//                                 name="product_id[]"
//                                 value={product.id}
//                                 id={"product_id-" + product.id}
//                                 className=" absolute top-1 left-1 "
//                                 checked={
//                                     selectedProducts?.find((p) => p?.id === product?.id)
//                                         ? true
//                                         : false
//                                 }
//                                 onChange={(e) => {
//                                     console.log(e.target.checked);
//                                     if (e.target.checked) {
//                                         setSelectedProducts([...selectedProducts, product]);
//                                     } else {
//                                         setSelectedProducts(
//                                             selectedProducts.filter((p) => p.id !== product.id)
//                                         );
//                                     }
//                                 }}
//                             />
//                             <label
//                                 className=" flex flex-col justify-center items-center "
//                                 htmlFor={"product_id-" + product.id}
//                             >
//                                 <img
//                                     src={product.image_url}
//                                     alt={product.name}
//                                     className=" w-10 aspect-square object-contain "
//                                 />
//                                 <span className=" text-[11px] text-center leading-3 ">
//                                     {product.name}
//                                 </span>
//                             </label>
//                         </div>
//                     );
//                 })}
//         </div>
//     );
// }
