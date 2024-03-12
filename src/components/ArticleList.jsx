import { useContext, useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleCard from "./ArticleCard"
import Loading from "./Loading"
import { ErrorContext } from "../context/Error"


const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(true)

    const {error, setError} = useContext(ErrorContext);

    useEffect(() => {
        getArticles().then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setLoading(false)
        }).catch(err => {
            setError((currError => {
                setLoading(false)
                return {...currError, msg: 'Something went wrong. Please try again'}
            }))
        })
    }, [])

    if (loading) return <Loading/>
    if(error.msg) return <p>{error.msg}</p>

    return (
        <section className="article-list big-screen">
            {articles.map((article) => {
               return  <ArticleCard key={article.article_id} article={article}/> 
            })}
        </section>
    )
}

export default ArticleList