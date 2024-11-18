import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = {
        // You can add values here that you want to provide
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
