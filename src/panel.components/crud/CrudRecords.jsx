import { cls } from "../../lib/utils";

export function CrudRecords({ isOpen, dataList, onRowPrint, classWrapp = "" }) {
    if (!isOpen) return null;
    return (
        <div className={cls("grid gap-4 md:grid-cols-2 lg:grid-cols-3", classWrapp)}>
            {dataList && dataList.map((row) => onRowPrint(row))}
            {dataList && dataList.length === 0 && (
                <div className="flex justify-center items-center h-32 text-[--c2-txt] opacity-50 ">
                    No hay registros
                </div>
            )}
            {dataList === null && (
                <div className="flex justify-center items-center h-32 text-[--c2-txt] opacity-50 ">
                    Cargando...
                </div>
            )}
        </div>
    );
}
