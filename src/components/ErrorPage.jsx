import { useContext } from "react"
import { ErrorContext } from "../context/Error"
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const {error, setError} = useContext(ErrorContext)
    const navigate = useNavigate()

    const resetError = () => {
        setError({
            msg: null,
            status: null,
            reloadButton: false,
            optionTwo: null,
            actionTwo: null,
            backButton: false
        })

    }

    if(!error.msg) {
        return <p>Page not found</p>
    }

    return (
        <section className="error-page">
            <p>{error.msg}</p>
            {error.reloadButton && (
                <button onClick={() => window.location.reload(false)}>Try again</button>
            )}
            {error.optionTwo && (
                <Link to={error.actionTwo}>
                    <button onClick={resetError}>{error.optionTwo}</button>
                </Link>
            )}
            {error.backButton && (
                <button onClick={() => {navigate(-1), resetError}}>Go back</button>
            )}
        </section>
    )
}

export default ErrorPage