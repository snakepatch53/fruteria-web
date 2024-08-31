export default function Receipt({ venta }) {
    if (!venta) return;
    if (Object.keys(venta).length === 0) return;

    const date = venta ? new Date(venta?.created_at).toLocaleDateString() : "0000-00-00";

    const subtotal = parseFloat(venta?.total);
    const iva = parseFloat(subtotal * import.meta.env.VITE_IVA);
    const total = subtotal + iva;

    return (
        <div className=" bg-[--c2] text-[--c2-txt] p-6 rounded-lg shadow-lg w-full max-w-[500px] ">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Recibo</h1>
                    <p className="text-sm  ">Nº: {venta?.id}</p>
                    <p className="text-sm  ">Fecha: {date}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-semibold">{import.meta.env.VITE_APP_NAME}</h2>

                    <p className="text-sm ">{import.meta.env.VITE_LOCATION_NAME}</p>
                    <p className="text-sm ">{import.meta.env.VITE_PHONE_NUMBER}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Cliente:</h3>
                <p className="text-sm ">{venta?.customer?.name}</p>
                <p className="text-sm ">{venta?.customer?.cedula}</p>
            </div>

            <table className="w-full mb-8 ">
                <thead>
                    <tr>
                        <th className="text-left p-2">Descripción</th>
                        <th className="text-right p-2">Cantidad</th>
                        <th className="text-right p-2">Precio</th>
                        <th className="text-right p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {venta?.product_sales?.map((row) => {
                        const product = row?.product;
                        const price = parseFloat(product.price);
                        const total = price * row.quantity;

                        return (
                            <tr key={row.id}>
                                <td className="p-2">{product.name}</td>
                                <td className="text-right p-2">
                                    {row.quantity} / {row?.product?.sale_type}
                                </td>
                                <td className="text-right p-2">${price.toFixed(2)}</td>
                                <td className="text-right p-2">${total.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    {venta?.combo_sales?.map((row) => {
                        const combo = row?.combo;
                        const price = parseFloat(combo.price);
                        const total = price * row.quantity;
                        return (
                            <tr key={row.id}>
                                <td className="p-2">{combo.name}</td>
                                <td className="text-right p-2">{row.quantity} / Unidades</td>
                                <td className="text-right p-2">${price.toFixed(2)}</td>
                                <td className="text-right p-2">${total.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex justify-end">
                <div className="text-right">
                    <div className="flex justify-between w-64 mb-2">
                        <span className="font-semibold">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between w-64 mb-2 ">
                        <span className="font-semibold ">IVA:</span>
                        <span>${iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between w-64 text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-600">
                <p>Gracias por su compra.</p>
            </div>
        </div>
    );
}
