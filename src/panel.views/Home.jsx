import { useEffect, useState } from "react";
import { GraphicBar, GraphicPie } from "../panel.components/Charts";
import { getProducts } from "../services/products";
import { getCombos } from "../services/combos";

export default function Home() {
    const [barDataProducts, setBarDataProducts] = useState([]);
    const [barDataCombos, setBarDataCombos] = useState([]);
    const [pieDataProducs, setPieDataProducts] = useState([]);

    useEffect(() => {
        getProducts().then((data) => {
            const barData = data.map((product) => ({
                name: product.name,
                value: product.product_sales.reduce((acc, sale) => acc + sale.quantity, 0),
            }));

            setBarDataProducts(barData);

            const totalFruits = data
                .filter((product) => product.category === "Frutas")
                .reduce(
                    (acc, product) =>
                        acc + product.product_sales.reduce((_acc, sale) => _acc + sale.quantity, 0),
                    0
                );

            const totalVegetables = data
                .filter((product) => product.category === "Verduras")
                .reduce(
                    (acc, product) =>
                        acc + product.product_sales.reduce((_acc, sale) => _acc + sale.quantity, 0),
                    0
                );

            setPieDataProducts([
                {
                    name: "Frutas",
                    color: "#0088FE",
                    value: totalFruits,
                },
                {
                    name: "Verduras",
                    color: "#00C49F",
                    value: totalVegetables,
                },
            ]);
        });

        getCombos().then((data) => {
            const barData = data.map((combo) => ({
                name: combo.name,
                value: combo.combo_sales.reduce((acc, sale) => acc + sale.quantity, 0),
            }));

            setBarDataCombos(barData);
        });
    }, []);

    return (
        <div className=" p-4 space-y-4 w-full ">
            <h2 className=" container text-2xl font-bold mb-4">Estadísticas</h2>

            <GraphicBar
                height={barDataProducts.length * 35}
                barData={barDataProducts}
                title="Cantidad de Ventas por Producto"
            />
            <GraphicBar
                height={barDataCombos.length * 70}
                barData={barDataCombos}
                title="Cantidad de Ventas por Combo"
                color="#121212"
            />
            <GraphicPie pieData={pieDataProducs} title="Ventas: Frutas VS Verduras" />
            {/* <GraphicLine
                lineData={lineData}
                title="Tráfico Semanal"
                bottomLegend="Este gráfico muestra el tráfico diario de la última semana."
            /> */}
        </div>
    );
}
