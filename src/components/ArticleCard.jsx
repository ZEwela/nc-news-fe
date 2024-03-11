import { Link } from 'react-router-dom';
const ArticleCard = ({article}) => {

    return (
        <section className="article-card">
            <Link to={`/articles/${article.article_id}`}> 
                <p>{article.title}</p>      
                <p>author: {article.author}</p>
                <img src={article.article_img_url}/>  
            </Link>
            <p>votes: {article.votes}</p>
        </section>
    )  
}

export default ArticleCard