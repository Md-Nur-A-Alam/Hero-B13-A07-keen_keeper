import { createContext } from "react";

const Context = createContext();


const ContextProvider = ({children}) => {
    const info = {

    }
    return (
        <Context.Provider value={info}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;