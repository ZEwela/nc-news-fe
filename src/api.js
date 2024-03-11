import axios from "axios"

const newsAPI = axios.create({baseURL: "https://nc-news-kpcd.onrender.com/api"})

export const getArticles = () => {
    return newsAPI.get("/articles").then(response => {
        return response.data.articles
    })

}