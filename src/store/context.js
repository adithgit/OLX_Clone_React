import React,{ useState,createContext } from "react"

export const firebaseContext = createContext(null)
export const authContext = createContext(null)
export default function ({children}){
    const [user,setUser] = useState(null)
    return (
        <authContext.Provider value = {{user,setUser}}>
            {children}
        </authContext.Provider>
    )
}