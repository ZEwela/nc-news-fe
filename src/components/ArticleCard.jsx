
const ArticleCard = ({article}) => {

    return (
        <section className="article-card">
            <p>{article.title}</p>      
            <p>{article.author}</p>
            <img src={article.article_img_url}/>  
            <p>votes: {article.votes}</p>
        </section>
    )  
}

export default ArticleCard