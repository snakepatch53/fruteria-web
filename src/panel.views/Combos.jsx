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
                    {datalist &&
                        datalist
                            ?.sort((a, b) => b.active - a.active)
                            ?.map((row) => (
                                <Item
                                    key={row.id}
                                    row={row}
                                    onEdit={() => handleModeEdit(row)}
                                    onDelete={() => handleModeDelete(row)}
                                />
                            ))}
                    {datalist === null && (
                        <>
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                            <ItemSkeleton />
                        </>
                    )}
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
                        { value: 1, label: "Si", checked: true },
                        { value: 0, label: "No" },
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
                        " text-red-600 ": row.active == false,
                        " text-green-600 ": row.active == true,
                    })}
                >
                    {row.active == true ? "Activo" : "Inactivo"}
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

function ItemSkeleton() {
    return (
        <div className=" flex flex-col items-center gap-1 w-full border shadow-md rounded-lg p-4 bg-black/5 animate-pulse ">
            <div className=" block w-full aspect-video rounded-md border bg-black/5 " />
            <div className=" w-2/3 h-5 rounded-full bg-black/5 " />
            <div className=" flex justify-center gap-2 w-full ">
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
                <div className=" w-1/5 h-4 rounded-full bg-black/5 " />
            </div>
            <div className=" w-1/4 h-3 rounded-full bg-black/5 " />
            <div className=" flex justify-center gap-2 w-full ">
                <div className=" w-8 aspect-square rounded-md bg-black/5 " />
                <div className=" w-8 aspect-square rounded-md bg-black/5 " />
                <div className=" w-8 aspect-square rounded-md bg-black/5 " />
            </div>
        </div>
    );
}
