import Button from "../panel.components/crud/Button";
import { faPenToSquare, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { CrudForm } from "../panel.components/crud/CrudForm";
import CrudHead from "../panel.components/crud/CrudHead";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
// import CrudAvatar from "../panel.components/crud/crudAvatar";
import useCrudPanel from "../hooks/useCrudPanel";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { destroyProduct, getProducts, storageProduct, updateProduct } from "../services/products";
import { cls } from "../lib/utils";

export default function Productos() {
    const extraValidations = ($form, showNotification) => {
        let validate = true;

        if ($form.photo?.files?.length && $form.photo?.files[0]?.size > 2000000) {
            showNotification("La foto debe pesar maximo 2MB");
            validate = false;
        }
        return validate;
    };

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
        entityName: "Producto",
        pluralEntityName: "Productos",
        searchFields: ["name", "description", "price", "category", "sale_type"],
        excludeFieldsValidationEdit: ["image"],
        extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getProducts,
        crudStorage: storageProduct,
        crudUpdate: updateProduct,
        crudDestroy: destroyProduct,
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
                <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                <CrudFormInput
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del producto"
                    required
                />
                <CrudFormInput
                    label="Descripción"
                    name="description"
                    placeholder="Escriba una descripción del producto"
                />
                <CrudFormInput
                    label="Precio"
                    name="price"
                    type="number"
                    placeholder="Escriba el precio del producto"
                    required
                />
                <CrudFormInput label="Foto" name="image" type="file" accept="image/png" required />
                <CrudFormInput
                    name="category"
                    label="Categoria"
                    type="radio"
                    radioOptions={[
                        { value: "Frutas", label: "Frutas", checked: true },
                        { value: "Verduras", label: "Verduras" },
                    ]}
                    required
                />
                <CrudFormInput
                    name="sale_type"
                    label="Tipo de venta"
                    type="radio"
                    radioOptions={[
                        { value: "Libras", label: "Libra", checked: true },
                        { value: "Kilos", label: "Kilo" },
                        { value: "Unidades", label: "Unidad" },
                    ]}
                    required
                />
                <CrudFormInput
                    name="offer"
                    label="Oferta"
                    type="radio"
                    radioOptions={[
                        { value: 1, label: "Si" },
                        { value: 0, label: "No", checked: true },
                    ]}
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
                text="¿Estás seguro de eliminar este Producto?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />
            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </div>
    );
}

function Item({ row, onEdit, onDelete }) {
    return (
        <div className=" flex flex-col items-center gap-2 p-4 border rounded-lg shadow bg-[--c2] text-[--c2-txt] ">
            <img
                src={row.image_url}
                alt={row.name}
                className=" w-32 aspect-square object-contain border rounded-lg "
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-center font-medium text-[--c2-txt] truncate">
                    {row.name}
                </p>
                <p className=" text-sm text-center text-[--c2-txt3] truncate ">
                    ${row.price} / {row.sale_type}
                </p>
                <p className=" text-sm text-center text-[--c2-txt3] truncate ">{row.category}</p>
                <div className=" flex justify-center items-center gap-1 text-center ">
                    <p
                        className={cls("text-xs text-center ", {
                            " text-red-600 ": row.active == false,
                            " text-green-600 ": row.active == true,
                        })}
                    >
                        {row.active == true ? "Activo" : "Inactivo"}
                    </p>

                    {row.offer == true && (
                        <>
                            <span> - </span>
                            <p className=" text-xs text-center text-blue-800 ">En Oferta</p>
                        </>
                    )}
                </div>
            </div>
            <div className=" flex flex-shrink-0 ">
                <Button onClick={onEdit} icon={faPenToSquare} />
                <Button onClick={onDelete} icon={faTrash} />
            </div>
        </div>
    );
}

function ItemSkeleton() {
    return (
        <div className=" flex flex-col items-center gap-1 w-full border shadow-md rounded-lg p-4 bg-black/5 animate-pulse ">
            <div className=" block w-full aspect-square rounded-md border bg-black/5 " />
            <div className=" w-full h-5 rounded-full bg-black/5 " />
            <div className=" w-2/3 h-5 rounded-full bg-black/5 " />
            <div className=" w-1/2 h-4 rounded-full bg-black/5 " />
            <div className=" flex justify-center gap-2 w-full ">
                <div className=" w-1/3 h-3 rounded-full bg-black/5 " />
                <div className=" w-1/3 h-3 rounded-full bg-black/5 " />
            </div>
            <div className=" flex justify-center gap-2 w-full ">
                <div className=" w-8 aspect-square rounded-md bg-black/5 " />
                <div className=" w-8 aspect-square rounded-md bg-black/5 " />
            </div>
        </div>
    );
}
