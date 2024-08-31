import { createContext, useEffect, useState } from "react";
import { getCombos } from "../services/combos";

// create context
export const ComboContext = createContext();

export function ComboProvider({ children }) {
    const [combos, setCombos] = useState(null);

    useEffect(() => {
        getCombos().then((data) => {
            const _combos = data.filter((combo) => combo.active);
            setCombos(_combos);
        });
    }, []);

    return (
        <ComboContext.Provider
            value={{
                combos,
            }}
        >
            {children}
        </ComboContext.Provider>
    );
}
