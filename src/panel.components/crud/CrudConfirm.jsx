import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faClose, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../lib/utils";
import Button from "./Button";

export default function CrudConfirm({ isOpen, text, onClickDelete, onClickCancel }) {
    if (!isOpen) return null;
    return (
        <section
            className={cls(
                "fixed inset-0 flex justify-center items-center w-full m-auto bg-black/10 backdrop-blur-sm z-50 overflow-hidden h-0 opacity-0 transition ",
                {
                    " h-full opacity-1 ": isOpen,
                }
            )}
            onClick={(evt) => {
                if (evt.target === evt.currentTarget) onClickCancel();
            }}
        >
            <div className="relative flex flex-col gap-5 w-auto max-w-96 h-auto p-10 bg-[--c2] backdrop-blur-sm rounded-md ">
                <div className=" flex flex-col gap-3 ">
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="text-6xl text-black/40 m-auto"
                    />
                    <p className=" font-sans font-semibold text-[--c3-txt] text-balance opacity-80 text-center ">
                        {text}
                    </p>
                    <button
                        className=" absolute top-2 right-2 flex justify-center items-center w-8 aspect-square text-xl text-[--c3-txt] opacity-50 transition hover:opacity-100 hover:text-2xl "
                        onClick={onClickCancel}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="flex justify-center gap-3 p-3">
                    <Button
                        name="Eliminar"
                        icon={faTrash}
                        onClick={onClickDelete}
                        classWrapp=" h-11 px-3 "
                        variant={2}
                    />
                    <Button
                        name="Cancelar"
                        icon={faBan}
                        onClick={onClickCancel}
                        classWrapp=" h-11 px-3 "
                        variant={3}
                    />
                </div>
            </div>
        </section>
    );
}
