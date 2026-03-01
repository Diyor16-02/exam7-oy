import { createContext, useState, type ReactNode } from "react";


interface ContextType {
    collepsed:boolean,
    setCollepsed:any
}
export const Context = createContext<ContextType>({} as ContextType)


export const GlobalContext = ({children}:{children:ReactNode}) => {
    const [collepsed, setCollepsed] = useState<boolean>(false)

    return <Context.Provider value={{collepsed, setCollepsed}}>{children}</Context.Provider>
}