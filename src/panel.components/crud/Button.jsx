import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../lib/utils";

export default function Button({
    tag = "button",
    name = "",
    icon = null,
    children,
    classWrapp = "",
    variant = 1,
    ...props
}) {
    const Tag = tag;

    const classVariant = {
        1: "",
        2: " bg-black text-white hover:bg-black/80 ",
        3: " bg-black/10 text-black hover:bg-black/20 ",
    };

    return (
        <Tag
            className={cls(
                " flex justify-center items-center gap-1 h-9 p-2 rounded transition hover:bg-black/5 ",
                classVariant[variant],
                classWrapp,
                {
                    " aspect-square ": icon !== null && name === "",
                }
            )}
            {...props}
        >
            {children ? (
                children
            ) : (
                <>
                    {icon && <FontAwesomeIcon className=" opacity-80 " icon={icon} />}
                    {name}
                </>
            )}
        </Tag>
    );
}
