import { faBan, faSave } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../lib/utils";
import Button from "./Button";

export function CrudForm({
    children,
    title,
    onClickCancel,
    isOpen = false,
    onSubmit,
    formRef,
    showSaveButton = true,
    textCancel = "Cancelar",
}) {
    return (
        <section
            className={cls(
                " flex justify-around items-center w-full bg-[--c2] rounded-lg border shadow ",
                "m-0 px-0 py-0 h-0 overflow-hidden opacity-0 ",
                {
                    "px-4 py-2 h-auto opacity-100 overflow-visible ": isOpen,
                }
            )}
        >
            <form
                className=" flex flex-col w-full h-auto "
                onSubmit={onSubmit}
                ref={formRef}
                noValidate
            >
                <div className=" flex justify-start items-center w-full h-10 ">
                    <h3 className="uppercase font-sans font-bold text-lg text-[--c2-txt]">
                        {title}
                    </h3>
                </div>
                <div className=" grid lg:grid-cols-2 gap-5 py-3 ">{children}</div>
                <div className=" flex flex-col items-center py-5 ">
                    <div className=" flex gap-2 ">
                        {showSaveButton && (
                            <Button
                                classWrapp=" h-11 px-3 "
                                name="Guardar"
                                icon={faSave}
                                type="submit"
                                variant={2}
                            />
                        )}
                        <Button
                            classWrapp=" h-11 px-3 "
                            name={textCancel}
                            icon={faBan}
                            onClick={onClickCancel}
                            type="button"
                            variant={3}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}
