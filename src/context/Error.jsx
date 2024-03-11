import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [error, setError] = useState({
        msg: null,
        status: null,
        optionOne: null,
        actionOne: null,
        optionTwo: null,
        actionTwo: null,
        backButton: false
    })

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    )
}