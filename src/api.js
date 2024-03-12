import axios from "axios"

const newsAPI = axios.create({baseURL: "https://nc-news-kpcd.onrender.com/api"})

export const getArticles = (topic, sort, order) => {
    return newsAPI.get("/articles", { params: { topic: topic, sort_by: sort, order: order }}).then(response => {
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

export const getCommentsByArticleId = (articleId) => {
    return newsAPI.get(`/articles/${articleId}/comments`).then(response => {
        return response.data.comments
    })
}

export const postCommentByArticleId = (articleId, body) => {
    return newsAPI.post(`/articles/${articleId}/comments`, body).then(response => {
        return response.data.comment
    })
}

export const patchCommentById = (commentId, body) => {
    return newsAPI.patch(`/comments/${commentId}`, body).then(response => {
        return response.data.comment
    })
}

export const removeComment = (commentId) => {
    return newsAPI.delete(`/comments/${commentId}`).then(response => {
        return response.data
    })
}

export const getTopics = () => {
    return newsAPI.get("/topics").then(response => {
        return response.data.topics
    })
}


