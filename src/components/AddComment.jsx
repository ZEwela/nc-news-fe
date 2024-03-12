import { TextField } from "@mui/material"
import { useContext, useState } from "react"
import {UserContext} from "../context/User"
import { postCommentByArticleId } from "../api"

const AddComment = ({articleId, setComments, handleTogglingOnAddComment, handleTogglingOnCancelAddComment}) => {
    const {user} = useContext(UserContext)
    const [newComment, setNewComment] = useState({username: user.username || null, body: ""})
    const [error, setError] = useState('');

    const handleAddingComment = (e) => {
        e.preventDefault()
        const copyOfNewComment = {...newComment, votes: 0, author: user.username, comment_id: user.username + Date.now()}
        handleTogglingOnAddComment()

        setComments(currComments => [copyOfNewComment, ...currComments])
        postCommentByArticleId(articleId, newComment).then(commentFromApi => {})
        setNewComment((currNewComment => {return {...currNewComment, body: ""}}))
    }

    const handleCommentChange = (e) => {
        const { value } = e.target;

        setNewComment(currComment =>{return {...currComment, body: value}})


        if (value.length < 2) {
            setError('Comment must be at least 2 characters long.');
          } else {
            setError('');
          }
    }

    return (
        <form className="border add-comment">
            <TextField
              className="comment-input"
              required
              error={!!error}
              helperText={error}
              value={newComment.body}
              onChange={handleCommentChange}
              label="Type your comment here"
              multiline
              maxRows={5}
            />
            <button  disabled={newComment.body.length < 2} type="submit" onClick={handleAddingComment}>Add comment</button>
            <button type="reset" onClick={handleTogglingOnCancelAddComment}>Cancel</button>
        </form>
    )
}

export default AddComment