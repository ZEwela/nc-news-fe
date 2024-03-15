import { TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/User"
import { postCommentByArticleId } from "../api"

const AddComment = ({articleId, setComments, setShowComments, setCommentCount}) => {
    const {user} = useContext(UserContext)
    const [newComment] = useState({username: user.username})
    const [commentBody, setCommentBody] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [disabledAddCommentButton, setDisabledAddCommentButton] = useState(false)

    const resetCommentBody = () => {
      setCommentBody("")
      localStorage.removeItem("comment_body")
    }

    useEffect(() => {
      const commentBodyFromLocalStorage = localStorage.getItem('comment_body')
      if(commentBodyFromLocalStorage) {
        setCommentBody(commentBodyFromLocalStorage)
        localStorage.removeItem("comment_body")
      }
    }, [])
  

    const handleAddingComment = (e) => {
      e.preventDefault()
      setDisabledAddCommentButton(true)

      const commentToBeSendToAPI = {...newComment, body: commentBody }


      postCommentByArticleId(articleId, commentToBeSendToAPI)
        .then((commentFromAPI) => {  
          resetCommentBody()
          setComments(currComment => [commentFromAPI, ...currComment])
          setShowComments(true)
          setCommentCount(currState => currState + 1)
          setDisabledAddCommentButton(false)
        })
        .catch(() => {
          setErrorMsg('Something went wrong. Please try again or')
          setDisabledAddCommentButton(false)
        })
      } 

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setCommentBody(value)
    }

    const handleReload = () => {
      localStorage.setItem('comment_body', commentBody)
      window.location.reload(false)
    }

    return (
        <form className="border add-comment">
            <TextField
              className="form-input"
              required
              value={commentBody}
              onChange={handleCommentChange}
              label="Type your comment here"
              multiline
              maxRows={5}
            />
            <div className="form-add-actions">
              <button  disabled={disabledAddCommentButton || !commentBody.length} type="submit" onClick={handleAddingComment}>Add comment</button>
              {commentBody.length !== 0 && 
                <button type="reset" onClick={resetCommentBody}>
                  Clear
                </button>
              }
            </div>
            {(errorMsg  && commentBody.length !== 0) && <p className="comment-card-error">{errorMsg}<button onClick={handleReload}>Reload</button></p>}
        </form>
    )
}

export default AddComment