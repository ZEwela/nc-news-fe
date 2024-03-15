import { useContext, useState } from "react"
import { patchCommentById, removeComment } from "../api"
import VoteElement from "./VoteElement"
import { UserContext } from "../context/User"

const CommentCard = ({comment, setComments, setCommentCount}) => {

    const {user} = useContext(UserContext)
    const [errorMsg, setErrorMsg] = useState(null)
    const [disabled, setDisabled] = useState(false)


    const handleVoting = (vote) => {
        patchCommentById(comment.comment_id, {inc_votes: vote}).catch(() => {})
    }

    const handleDeleting = () => {
        setDisabled((currState) => !currState)
        removeComment(comment.comment_id).then(() => {
            setComments(currComments => {
                return  currComments.filter((currComment) => currComment.comment_id !== comment.comment_id)})
                setCommentCount(currState => currState - 1)
            }).catch(() => { 
            setErrorMsg('Something went wrong. Please try again or')
            setDisabled((currState) => !currState)
        })
    }
        
    return (
        <section className="border comment-card">
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <VoteElement votes={comment.votes} handleVoting={handleVoting}/>
            { user.username === comment.author && <button onClick={handleDeleting} disabled={disabled}>Delete</button>}
            {errorMsg && <p className="comment-card-error">{errorMsg} <button onClick={() => window.location.reload(false)}>Reload</button></p>}
         
        </section>
    )}
    
export default CommentCard