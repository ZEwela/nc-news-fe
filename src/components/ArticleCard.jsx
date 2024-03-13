import { Link } from 'react-router-dom';
const ArticleCard = ({article}) => {

    return (
        <section className="border article-card">
            <Link to={`/articles/${article.article_id}`}> 
                <h2>{article.title}</h2>   
                <div className='horizontal'>
                    <p><strong>author:</strong> {article.author}</p>
                    <p><strong>created:</strong> {article.created_at.slice(0,10)}</p>
                </div> 
                <img src={article.article_img_url}/>  
                <div className="horizontal">
                    <p><strong>votes:</strong> {article.votes}</p>
                    <p><strong>comments:</strong> {article.comment_count}</p>
                </div>
            </Link>

        </section>
    )  
}

export default ArticleCard