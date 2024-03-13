import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [error, setError] = useState({
        msg: null,
        status: null,
        reloadButton: false,
        optionText: null,
        optionAction: null,
    })

    const resetError = () => {
        setError({
            msg: null,
            status: null,
            reloadButton: false,
            optionText: null,
            optionAction: null,
        })

    }

    return (
        <ErrorContext.Provider value={{error, setError, resetError}}>
            {children}
        </ErrorContext.Provider>
    )
}