import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../api"
import Loading from "./Loading"
import CommentCard from "./CommentCard"
import AddComment from "./AddComment"
import LoadItems from "./LoadItems"

const CommentsList = ({article_id, comment_count}) => {
    const [comments, setComments] =  useState(null)
    const [loading, setLoading] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [showAddComment, setShowAddComment] = useState(false)
    const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] = useState(false)
    const [lengthOfLoadedComments, setlengthOfLoadedComments] = useState(0)
    const [p, setP] = useState(1)
    const [limit] = useState(10)
    

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


    const handleLoadMore = () => {
        setP(currState =>  {return Number(currState)+1})
        const newP = String(+p + 1)
        getCommentsByArticleId(article_id, newP).then((commentsFromApi) => {
            setlengthOfLoadedComments(commentsFromApi.length)
            if (newP === 1 ) {  setLoadMoreButtonDisabled(false) }
            setComments(currComments => { return [...currComments, ...commentsFromApi]})
        })
    }

    const handleLoadLess = () => {
        let endIndexForSlice = limit
        setP(currState =>  {
            return Number(currState)-1}
        )
        if (lengthOfLoadedComments !== limit) {
            endIndexForSlice = lengthOfLoadedComments
            setlengthOfLoadedComments(limit)
        }
        setComments(currComments => {
            return currComments.slice(0, (comments.length - endIndexForSlice))
        })
    }

    if (loading) return <Loading/>
    return (
        <section className="border comments-list">
            { comments.length > 0 && <button onClick={() => toggle(setShowComments)}>{showComments ? 'Hide' : 'Show'} comments: {comment_count}</button>}
            { !showAddComment && <button onClick={() => toggle(setShowAddComment)}>Add comment</button>}
            { showAddComment && <AddComment articleId={article_id} setComments={setComments} handleTogglingOnAddComment={handleTogglingOnAddComment} handleTogglingOnCancelAddComment={handleTogglingOnCancelAddComment}/>}
            { showComments && 
                <section> 
                    { comments.map((comment) => {
                        return (
                            <CommentCard key={comment.comment_id} comment={comment} setComments={setComments}/>
                        )
                    })}
                    <LoadItems itemsLength={comments.length} totalItems={comment_count} limit={limit} loadMoreButtonDisabled={loadMoreButtonDisabled} handleLoadMore={handleLoadMore} handleLoadLess={handleLoadLess}/>
                </section>
            }

            
           
        </section>
    )
}

export default CommentsList