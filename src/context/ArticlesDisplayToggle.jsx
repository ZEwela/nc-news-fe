import { createContext, useState } from "react";

export const ArticlesDisplayToggleContext = createContext();

export const ArticlesDisplayToggleProvider = ({children}) => {
    const [articlesDisplayToggle, setArticlesDisplayToggle] = useState(true)

    return (
        <ArticlesDisplayToggleContext.Provider value={{articlesDisplayToggle, setArticlesDisplayToggle}}>
            {children}
        </ArticlesDisplayToggleContext.Provider>
    )
}

