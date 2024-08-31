import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { LineChart, Line } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

export function GraphicBar({
    height = 200,
    barData,
    title = "",
    bottomLegend = "",
    color = "#8884d8",
}) {
    return (
        <>
            <h1>{title}</h1>
            <div
                style={{
                    height: `${height}px`,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical" // Este es el ajuste clave para hacer que las barras sean horizontales
                        data={barData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" interval={0} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{bottomLegend}</p>
        </>
    );
}

export function GraphicLine({ height = 200, lineData, title = "", bottomLegend = "" }) {
    return (
        <>
            <h1>{title}</h1>
            <div
                style={{
                    height: `${height}px`,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis dataKey="value" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{bottomLegend}</p>
        </>
    );
}

export function GraphicPie({ height = 200, pieData, title = "", bottomLegend = "" }) {
    return (
        <>
            <h1>{title}</h1>
            <div
                style={{
                    height: `${height}px`,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>
                <div className="flex justify-center mt-2">
                    {pieData.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center mx-2">
                            <div
                                className="w-3 h-3 mr-1"
                                style={{
                                    backgroundColor: entry.color,
                                }}
                            ></div>
                            <span className="text-xs">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{bottomLegend}</p>
        </>
    );
}
