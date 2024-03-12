import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        "username": "rogersop",
        "name": "paul",
        "avatar_url": "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}