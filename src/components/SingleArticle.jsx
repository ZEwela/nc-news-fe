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
            setError({msg: err.response.data.msg, status: err.response.status })
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
        <section className='flex flex-col big-screen'>
                <div className='flex flex-col text-sm'>
                    <p><strong>author:</strong> {article.author}</p>
                    <p><strong>created:</strong> {article.created_at.slice(0,10)}</p>
                </div>
                <h1 className="md:text-2xl m-4 font-bold text-lg">{article.title}</h1>  
                <img src={article.article_img_url} alt=""/>  
                <p className='m-5'>{article.body}</p>
                <VoteElement votes={article.votes} handleVoting={handleVoting}/>
                <CommentsList comment_count={+article.comment_count} article_id={article_id}/>
        </section>
    )

}

export default SingleArticle