'use client'
import { createContext, useEffect, useState } from "react"
const UserContext = createContext();
const UserProvider = ({ children, user_init }) => {
    console.log(user_init)
    const [user, SetUser] = useState(user_init)
     
    return (
        <UserContext.Provider value={{user,SetUser}}>
            {children}
        </UserContext.Provider>)
}
export {UserProvider,UserContext}