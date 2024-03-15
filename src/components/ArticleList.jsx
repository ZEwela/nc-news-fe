import { useContext, useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleCard from "./ArticleCard"
import Loading from "./Loading"
import { ErrorContext } from "../context/Error"
import { useParams, useSearchParams } from "react-router-dom"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import ErrorPage from "./ErrorPage"
import LoadItems from "./LoadItems"


const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [totalArticles, setTotalArticles] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] = useState(false)
    const [lengthOfLoadedArticles, setlengthOfLoadedArticles] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, setError} = useContext(ErrorContext);
    const {topic} = useParams()
   
    const [sort, setSort] = useState(searchParams.get('sort_by')|| "created_at")
    const [order, setOrder] = useState(searchParams.get('order')||"desc")
    const [p, setP] = useState(1)
    const [limit] = useState(10)

    const queries =  [
        "sort_by",
        "order",
        "p"
        ]
    const acceptableQueryValues =  /^(created_at|comment_count|votes|desc|asc|\d+)$/

    useEffect(() => {
        setSearchParams((currParams) => {return {...currParams, sort_by: sort, order: order}})
        for (const entry of searchParams.entries()) {
            if (!queries.includes(entry[0]) || !acceptableQueryValues.test(entry[1])) {
                setLoading(false)
                setError({msg: "Sorry something went wrong", status: 400 })
            }
        }
        getArticles(topic, sort, order, p).then((dataFromApi) => {
            setArticles(dataFromApi.articles)
            setTotalArticles(dataFromApi.total_count)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            setError({msg: err.response.data.msg, status: err.response.status})
        })
    }, [topic, sort, order])

    const handleChange = (e) => {
        setSort(e.target.value)
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }


    const handleLoadMore = () => {
        setP(currState =>  {return Number(currState)+1})
        const newP = String(+p + 1)
        getArticles(topic, sort, order, newP).then((dataFromApi) => {
            setlengthOfLoadedArticles(dataFromApi.articles.length)
            if (newP === 1 ) {  setLoadMoreButtonDisabled(false) }
            setArticles(currArticles => { return [...currArticles, ...dataFromApi.articles]})
        })
    }

    const handleLoadLess = () => {
        let endIndexForSlice = limit
        setP(currState =>  {
            return Number(currState)-1}
        )
        if (lengthOfLoadedArticles !== limit) {
            endIndexForSlice = lengthOfLoadedArticles
            setlengthOfLoadedArticles(limit)
        }
        setArticles(currArticles => {
            return currArticles.slice(0, (articles.length - endIndexForSlice))
        })
    }

    if (loading) return <Loading/>
    if(error.msg) return <ErrorPage />
    if(!articles?.length) return <p className="big-screen">There are no articles in this section</p>

    return (
      
        <section className="big-screen">
            <section >
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
            <section className="article-list">
                {articles.map((article) => {
                   return  <ArticleCard key={article.article_id} article={article}/> 
                })}
            </section>
            <LoadItems  itemsLength={articles.length} totalItems={totalArticles} limit={limit} loadMoreButtonDisabled={loadMoreButtonDisabled} handleLoadMore={handleLoadMore} handleLoadLess={handleLoadLess}/>
        </section>
    )
}

export default ArticleList