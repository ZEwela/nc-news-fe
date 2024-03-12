import { patchCommentById } from "../api"
import VoteElement from "./VoteElement"

const CommentCard = ({comment}) => {


    const handleVoting = (vote) => {
        patchCommentById(comment.comment_id, {inc_votes: vote}).then((updatedComment) => {
        }).catch((err) => {})
    }
    

return (
    <section className="border comment-card">
        <p>{comment.author}</p>
        <p>{comment.body}</p>
        <VoteElement votes={comment.votes} handleVoting={handleVoting}/>
    </section>
)

}

export default CommentCard