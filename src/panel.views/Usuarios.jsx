import Button from "../panel.components/crud/Button";
import { faPenToSquare, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { CrudForm } from "../panel.components/crud/CrudForm";
import CrudHead from "../panel.components/crud/CrudHead";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import CrudAvatar from "../panel.components/crud/crudAvatar";
import { destroyUser, getUsers, storageUser, updateUser } from "../services/users";
import useCrudPanel from "../hooks/useCrudPanel";
import CrudProgress from "../panel.components/crud/CrudProgress";

export default function Usuarios() {
    const extraValidations = ($form, showNotification, { isEmail }) => {
        let validate = true;
        if ($form.password?.value && $form.password?.value?.length < 8) {
            showNotification("La contraseña debe tener minimo 8 caracteres");
            validate = false;
        }
        if (!isEmail($form.email?.value)) {
            showNotification("El correo electronico no es valido");
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
        entityName: "Usuario",
        pluralEntityName: "Usuarios",
        excludeFieldsValidationEdit: ["password"],
        searchFields: ["name", "lastname", "email", "role"],
        extraValidations,
        isStorageMultipartFormData: true,
        // isUpdateMultipartFormData: true,
        crudGet: getUsers,
        crudStorage: storageUser,
        crudUpdate: updateUser,
        crudDestroy: destroyUser,
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {datalist?.map((user) => (
                        <Item
                            key={user.id}
                            user={user}
                            onEdit={() => handleModeEdit(user)}
                            onDelete={() => handleModeDelete(user)}
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
                <CrudFormInput
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del usuario"
                    required
                />
                <CrudFormInput label="Email" name="email" placeholder="Escriba el email" required />
                <CrudFormInput
                    label="Contraseña"
                    placeholder="Escriba una contraseña"
                    type="password"
                    name="password"
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

function Item({ user, onEdit, onDelete }) {
    return (
        <div className=" flex items-center gap-2 p-4 border rounded-lg shadow bg-[--c2] text-[--c2-txt] ">
            <CrudAvatar name={user.name} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[--c2-txt] truncate">{user.name}</p>
                <p className="text-sm text-[--c2-txt3] truncate">{user.email}</p>
                <p className="text-xs text-[--c2-txt4]">{user.role}</p>
            </div>
            <div className=" flex flex-shrink-0 ">
                <Button onClick={onEdit} icon={faPenToSquare} />
                <Button onClick={onDelete} icon={faTrash} />
            </div>
        </div>
    );
}
