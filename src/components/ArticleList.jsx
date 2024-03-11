import { useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleCard from "./ArticleCard"
import Loading from "./Loading"

const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArticles().then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading/>

    return (
        <section className="article-list">
            {articles.map((article) => {
               return  <ArticleCard key={article.article_id} article={article}/> 
            })}
        </section>
    )
}

export default ArticleList