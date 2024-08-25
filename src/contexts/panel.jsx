import { createContext, useState } from "react";

// create context
export const PanelContext = createContext();

export function PanelProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <PanelContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
            }}
        >
            {children}
        </PanelContext.Provider>
    );
}
