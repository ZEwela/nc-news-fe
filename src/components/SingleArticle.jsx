import { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getArticleById, patchArticleById } from '../api'
import Loading from './Loading'
import { ErrorContext } from '../context/Error'
import ErrorPage from './ErrorPage'
import VoteElement from './VoteElement'
import CommentsList from './CommentsList'

const SingleArticle = () => {
    const {article_id} = useParams()
    const {error, setError} = useContext(ErrorContext)
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArticleById(article_id).then((articleFromApi) => {
            setArticle(articleFromApi)
            setLoading(false)
        }).catch(err => {
            setError((currErr) => {
                return {...currErr, 
                    msg: err.response.data.msg, 
                    status: err.response.status, 
                    reloadButton: true,
                    optionTwo: 'Go back to main',
                    actionTwo: `/`,
                 }
            })
            setLoading(false)
        })
    }, [article_id])

    const handleVoting = (vote) => {
        patchArticleById(article_id, {inc_votes: vote}).then((updatedArticleFromApi) => {
            setArticle((currArticle) => { 
                return {...currArticle, votes: updatedArticleFromApi.votes}
            })
        }
    )}
    

    if (loading) return <Loading/>
    if (error.msg) return <ErrorPage/>

    return (
        <section className='article-view article-card'>
                <p>{article.title}</p>      
                <p>author: {article.author}</p>
                <img src={article.article_img_url}/>  
                <p>{article.body}</p>
                <VoteElement votes={article.votes} handleVoting={handleVoting}/>
                <CommentsList article_id={article_id}/>
        </section>
    )

}

export default SingleArticle