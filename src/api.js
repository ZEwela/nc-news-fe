import axios from "axios"

const newsAPI = axios.create({baseURL: "https://nc-news-kpcd.onrender.com/api"})

export const getArticles = () => {
    return newsAPI.get("/articles").then(response => {
        return response.data.articles
    })
}

export const getArticleById = (articleId) => {
    return newsAPI.get(`/articles/${articleId}`).then(response => {
        return response.data.article
    })
}

export const patchArticleById = (articleId, body) => {
    return newsAPI.patch(`/articles/${articleId}`, body).then(response => {
        return response.data.article
    })
}