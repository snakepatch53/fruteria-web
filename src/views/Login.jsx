import {
    faArrowLeft,
    faEnvelope,
    faEye,
    faEyeSlash,
    faLock,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cls } from "../lib/utils";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { SessionContext } from "../contexts/session";
import { showNotification } from "../components/Notification";

export default function Login() {
    return (
        <div className=" flex flex-col justify-center items-center min-h-screen gap-3 ">
            <img
                src="/logo.png"
                alt="Logo de GV-Maps"
                className={"w-28 aspect-square mx-auto object-contain"}
            />
            <h1 className=" font-bold text-2xl ">Login</h1>

            <Form />

            <Link className=" hover:underline font-bold opacity-80 " to="/">
                <FontAwesomeIcon icon={faArrowLeft} className=" mr-2 " />
                Volver a la tienda
            </Link>
        </div>
    );
}

function Form() {
    const { progress, login } = useContext(SessionContext);

    return (
        <Formik
            validationSchema={Yup.object({
                email: Yup.string().required("Ingrese su correo electrónico"),
                password: Yup.string().required("Ingrese su contraseña"),
            })}
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values, { resetForm }) => {
                login(values).then((res) => {
                    console.log(res);
                    if (!res?.success)
                        return showNotification({
                            title: "Cancelado",
                            message: res?.message || "Error al iniciar sesion",
                            type: "warning",
                        });
                    resetForm();
                    showNotification({
                        title: "Sesión iniciada",
                        message: "Bienvenido",
                        type: "success",
                    });
                });
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className=" flex flex-col w-72  ">
                    <Input name="email" placeholder="Email" icon={faEnvelope} />
                    <Input name="password" placeholder="Contraseña" icon={faLock} isPass />

                    <button
                        className={cls(
                            " p-3 bg-[--c1] text-[--c1-txt] rounded-lg font-bold tracking-wide hover:opacity-80 cursor-pointer transition ",
                            progress ? "opacity-80 cursor-not-allowed" : ""
                        )}
                        type="submit"
                    >
                        {progress ? (
                            <FontAwesomeIcon className=" animate-spin ml-2 " icon={faSpinner} />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            )}
        </Formik>
    );
}

function Input({ isPass = false, name, placeholder, icon }) {
    const [showPass, setShowPass] = useState(false);
    return (
        <>
            <div className=" flex items-center gap-2 bg-black/10 p-3 rounded-lg ">
                <FontAwesomeIcon className=" opacity-70 " icon={icon} />
                <Field
                    name={name}
                    as="input"
                    className=" bg-transparent w-full text-lg "
                    type={isPass && showPass === false ? "password" : "text"}
                    placeholder={placeholder}
                />
                {isPass ? (
                    <button type="button" onClick={() => setShowPass(!showPass)}>
                        <FontAwesomeIcon
                            className=" opacity-80 "
                            icon={!showPass ? faEye : faEyeSlash}
                        />
                    </button>
                ) : null}
            </div>
            <div className=" text-center w-full h-6 text-red-500 text-sm">
                <ErrorMessage name={name} />
            </div>
        </>
    );
}
