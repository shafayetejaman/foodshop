import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const Context = createContext('');

export function useSearchBox()
{
    return useContext(Context);
}

export default function SearchProvider({ children })
{
    const [searchBox, setSearchBox] = useState('');

    return (
        <Context.Provider value={{searchBox, setSearchBox}}>
            {children}
        </Context.Provider>
    );

}
