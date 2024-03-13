import { useContext, useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleCard from "./ArticleCard"
import Loading from "./Loading"
import { ErrorContext } from "../context/Error"
import { useParams, useSearchParams } from "react-router-dom"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"


const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, setError} = useContext(ErrorContext);
    const {topic} = useParams()

    const [sort, setSort] = useState(searchParams.get('sort')|| "created_at")
    const [order, setOrder] = useState(searchParams.get('order')||"desc")

   
 
    useEffect(() => {
        
        getArticles(topic, sort, order).then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setSearchParams({ sort: sort, order: order });
            setLoading(false)
        }).catch(err => {
            setError((currError => {
                setLoading(false)
                return {...currError, msg: 'Something went wrong. Please try again'}
            }))
        })
    }, [topic, sort, order])

    const handleChange = (e) => {
        setSort(e.target.value)
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }

    if (loading) return <Loading/>
    if(error.msg) return <p>{error.msg}</p>
    if(!articles.length) return <p>There are no articles in this section</p>

    return (
        <>
            <section className="big-screen">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={sort}
                      label="Sort by"
                      onChange={handleChange}
                    >
                        <MenuItem value="created_at">Date</MenuItem>
                        <MenuItem value="comment_count">Comments count</MenuItem>
                        <MenuItem value="votes">Votes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Order</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={order}
                      label="Sort by"
                      onChange={handleOrderChange}
                    >
                        <MenuItem value="asc">Asc</MenuItem>
                        <MenuItem value="desc">Desc</MenuItem>
                    </Select>
                </FormControl>
            </section>
            <section className="article-list big-screen">
                {articles.map((article) => {
                   return  <ArticleCard key={article.article_id} article={article}/> 
                })}
            </section>
        </>
    )
}

export default ArticleList