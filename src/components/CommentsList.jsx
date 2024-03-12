import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../api"
import Loading from "./Loading"
import CommentCard from "./CommentCard"
import AddComment from "./AddComment"

const CommentsList = ({article_id}) => {
    const [comments, setComments] =  useState(null)
    const [loading, setLoading] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [showAddComment, setShowAddComment] = useState(false)
    

    const toggle = (setToggle) => {
        setToggle(curr =>  !curr)
    }

    const handleTogglingOnAddComment = () => {
        toggle(setShowAddComment)
        if(!showComments) toggle(setShowComments)
    }
    const handleTogglingOnCancelAddComment = () => {
        toggle(setShowAddComment)
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
            { comments.length > 0 && <button onClick={() => toggle(setShowComments)}>{showComments ? 'Hide' : 'Show'} comments: {comments.length}</button>}
            { !showAddComment && <button onClick={() => toggle(setShowAddComment)}>Add comment</button>}
            { showAddComment && <AddComment articleId={article_id} setComments={setComments} handleTogglingOnAddComment={handleTogglingOnAddComment} handleTogglingOnCancelAddComment={handleTogglingOnCancelAddComment}/>}
            { showComments && comments.map((comment) => {
                    return (
                        <CommentCard key={comment.comment_id} comment={comment} setComments={setComments}/>
                    )
                })
            }
           
        </section>
    )
}

export default CommentsList