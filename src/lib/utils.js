import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cls(...classes) {
    return twMerge(clsx(...classes));
}