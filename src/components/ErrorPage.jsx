import { useContext, useEffect } from "react"
import { ErrorContext } from "../context/Error"
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const {error, setError, resetError} = useContext(ErrorContext)
    const navigate = useNavigate()
    const location =  useLocation()

    useEffect(() => {
        let errMsg = error.msg;
        const otherOptionsChange = {}
        if (error.status === 404 || !error.msg) {
            if (location.pathname === "/articles") {
                errMsg = "Articles Not Found"
            } else if (location.pathname.includes("articles")) {
                errMsg = "Article Not Found"
            } else if (location.pathname.includes("topic")) {
                errMsg = "Topic Not Found"
            } else {
                errMsg = "Page Not Found"
            }
        } else if (error.status === 400){
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
                    <button className="error-button" onClick={() =>{window.location.reload(false); resetError()}}>Try again</button>
                )}
                <button className='error-button' onClick={() =>{window.location.href="/articles"; resetError()}}>Go to main</button>
                <button className="error-button" onClick={() => { resetError, navigate(location.search === "" ? -1 : -2 )}}>Go back</button>
            </section>
        </section>
    )
}

export default ErrorPage