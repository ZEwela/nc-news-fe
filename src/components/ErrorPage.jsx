import { useContext, useEffect } from "react"
import { ErrorContext } from "../context/Error"
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const {error, setError, resetError} = useContext(ErrorContext)
    const navigate = useNavigate()

    useEffect(() => {
        let errMsg = error.msg;
        const otherOptionsChange = {}
        if (error.status === 404 || !error.msg) {
            errMsg = "Not Found"
        } else if (error.status){
            errMsg = "Sorry something went wrong!"
            otherOptionsChange.reloadButton = true
        } 
        setError(currErr => {return {...currErr, msg: errMsg, ...otherOptionsChange}})
    }, [])
  

    return (
        <section className="error-page big-screen">
            <p>{error.msg}</p>
            <section className="error-buttons">
            {error.reloadButton && (
                <button onClick={() =>{window.location.reload(false); resetError()}}>Try again</button>
            )}
            <button onClick={() =>{window.location.href="/articles"; resetError()}}>Go to main</button>
            <button onClick={() => {navigate(-1), resetError}}>Go back</button>
            {error.optionText && (
                <Link to={error.optionAction}>
                    <button onClick={resetError}>{error.optionText}</button>
                </Link>
            )}
            </section>
        </section>
    )
}

export default ErrorPage