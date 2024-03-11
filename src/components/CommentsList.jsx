import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../api"
import Loading from "./Loading"
import CommentCard from "./CommentCard"

const CommentsList = ({article_id}) => {
    const [comments, setComments] =  useState(null)
    const [loading, setLoading] = useState(true)
    const [showComments, setShowComments] = useState(false)

    const toggleComments = () => {
        setShowComments(currShowComments =>  !currShowComments)
    }

    useEffect(() => {
        getCommentsByArticleId(article_id).then(commentsFromApi => {
            setComments(commentsFromApi)
            setLoading(false)
        })
    }, [article_id])

    if (loading) return <Loading/>
    return (
        <section className="border comments-list">
            <button onClick={toggleComments}>{showComments ? 'Hide' : 'Show'} comments: {comments.length}</button>
            { showComments && comments.map((comment) => {
                    return (
                        <CommentCard key={comment.comment_id} comment={comment}/>
                    )
                })
            }
        </section>
    )
}

export default CommentsList