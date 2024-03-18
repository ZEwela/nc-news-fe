import { useContext, useState } from "react"
import { patchCommentById, removeComment } from "../api"
import VoteElement from "./VoteElement"
import { UserContext } from "../context/User"
import { Button } from "@/components/ui/button.jsx"

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
        <section className="border-2 rounded p-4">
            <p className=' text-sm'><strong>author:</strong> {comment.author}</p>
            <p className=' text-sm'><strong>created:</strong> {comment.created_at.slice(0,10)}</p>
            <p className="m-6">{comment.body}</p>
            <VoteElement votes={comment.votes} handleVoting={handleVoting}/>
            
            { user.username === comment.author && <Button variant="destructive" className="m-3" onClick={handleDeleting} disabled={disabled}>Delete</Button>}
            {errorMsg && <p className="comment-card-error">{errorMsg} <button onClick={() => window.location.reload(false)}>Reload</button></p>}
         
        </section>
    )}
    
export default CommentCard