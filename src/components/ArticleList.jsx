import { useContext, useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleCard from "./ArticleCard"
import Loading from "./Loading"
import { ErrorContext } from "../context/Error"
import { useParams, useSearchParams } from "react-router-dom"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import ErrorPage from "./ErrorPage"


const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, setError} = useContext(ErrorContext);
    const {topic} = useParams()
   


    

    const [sort, setSort] = useState(searchParams.get('sort_by')|| "created_at")
    const [order, setOrder] = useState(searchParams.get('order')||"desc")
    const [p, setP] = useState(searchParams.get('p')||1)


    const queries =  [
        "sort_by",
        "order",
        "p"
        ]
    const acceptableQueryValues =  /^(created_at|comment_count|votes|desc|asc|\d+)$/

    useEffect(() => {
        setSearchParams((currParams) => {return {sort_by: sort, order: order, p: p}})
        for (const entry of searchParams.entries()) {
            if (!queries.includes(entry[0]) || !acceptableQueryValues.test(entry[1])) {
                setLoading(false)
                setError((currError => {
                    return {...currError, 
                        msg: "Sorry something went wrong",
                        status: 400, 
                    }
                }))
                return 
            }
        }
        getArticles(topic, sort, order).then((articlesFromApi) => {
            setArticles(articlesFromApi)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
            setError((currError => {
                return {...currError, 
                    msg: err.response.data.msg,
                    status: err.response.status, 
                }
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
    if(error.msg) return <ErrorPage />
    if(!articles?.length) return <p className="big-screen">There are no articles in this section</p>

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
                      label="Order"
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