import { TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/User"
import { getTopics, postArticle } from "../api"
import { useNavigate } from "react-router-dom"

const AddArticle = () => {
    const {user} = useContext(UserContext)
    const [newArticle, setNewArticle] = useState({author: user.username, title: "", body: "", topic:"All", article_img_url: "" })
    const [topics, setTopics] = useState(null)
    const [disabledAddArticleButton, setDisabledAddArticleButton] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        const newArticleFromLocalStorage = localStorage.getItem('new_article')
        if(newArticleFromLocalStorage) {
            setNewArticle(currState => {return {...currState, ...newArticleFromLocalStorage}})
            localStorage.removeItem("new_article")
        }
        getTopics().then(topicsFromApi => {
            setTopics(topicsFromApi)
        })
    }, [])



    const resetArticleBody = () => {
      setNewArticle(currState => {return {...currState, title: "", body: "", article_img_url: ""}})
      localStorage.removeItem("new_article")
    }
  

    const handleAddingArticle = (e) => {
      e.preventDefault()
      setDisabledAddArticleButton(true)
      const image_url = newArticle.article_img_url.length !== 0 ? newArticle.article_img_url : null;

      const articleToBeSendToAPI = {...newArticle, article_img_url: image_url }


      postArticle(articleToBeSendToAPI)
        .then((articleFromAPI) => { 
          navigate(`/articles/${articleFromAPI.article_id}`)
          setDisabledAddArticleButton(false)
        })
        .catch(() => {
          setErrorMsg('Something went wrong. Please try again or')
          setDisabledAddArticleButton(false)
        })
      } 

    const handleArticleChange = (key, value) => {
        setNewArticle((currArrt) => {return {...currArrt, [key]: value }})
    }

    const handleReload = () => {
      localStorage.setItem('new_article', {body: newArticle.body, topic: newArticle.topic, title: newArticle.title, article_img_url: newArticle.article_img_url})
      window.location.reload(false)
    }

    return (
        <form className="border big-screen add-article">
            <TextField
              className="comment-input"
              required
              value={newArticle.title}
              onChange={(e) => handleArticleChange("title", e.target.value)}
              label="Type title here"
              multiline
              maxRows={15}
            />
            <TextField
              className="comment-input"
              required
              value={newArticle.body}
              onChange={(e) => handleArticleChange("body", e.target.value)}
              label="Type your article here"
              multiline
              maxRows={100}
            />
            <section className="horizontal">
                <label htmlFor="categories">Choose a Topic</label>
                <select
                  name="Topics"
                  onChange={(e) => handleArticleChange("topic", e.target.value)}
                >
                    {topics?.map((topic) => {
                      if (topic.slug !== "All") {
                        return (
                          <option
                            value={topic.slug}
                            key={topic.slug}
                          >
                            {topic.slug}
                          </option>
                        );
                      }
                    })}
                </select>
            </section>
            <TextField
              className="form-input"
              value={newArticle.article_img_url}
              onChange={(e) => handleArticleChange("article_img_url", e.target.value)}
              label="Image URL"
              multiline
              maxRows={15}
            />
            <div className="form-add-actions">
              <button  disabled={disabledAddArticleButton || (newArticle.body.length === 0 || newArticle.title.length === 0)} type="submit" onClick={handleAddingArticle}>Add article</button>
              {(newArticle.body.length !== 0 || newArticle.title.length !== 0 || newArticle.article_img_url.length !== 0 ) && 
                <button type="reset" onClick={resetArticleBody}>
                  Clear
                </button>
              }
            </div>
            {(errorMsg  && newArticle.body.length !== 0 && newArticle.title.length !== 0) && <p className="comment-card-error">{errorMsg}<button onClick={handleReload}>Reload</button></p>}
        </form>
    )
}

export default AddArticle