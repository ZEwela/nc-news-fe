import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import { Button } from "@/components/ui/button.jsx"
import { deleteArticle } from '../api';
import AlertView from './AlertView';

const ArticleCard = ({article, setArticles}) => {
    const {user} =useContext(UserContext)
    const [err, setErr] = useState(false)

    const handleDelete = () => {
        deleteArticle(article.article_id)
            .then(() => {
                setArticles(currArticles => {
                    return currArticles.filter(currArticle => currArticle.article_id !== article.article_id)
                })
            })
            .catch(() => setErr(true))
    }

    const handleEdit = () => {}

    return (
        <section className="flex flex-col justify-center min-w-80 max-w-3xl border-2 rounded border-slate-200">
            <Link to={`/articles/${article.article_id}`} className=' border-slate-200/50  border-2 flex bg-slate-50/70 rounded p-4 flex-col items-center sm:flex-strech m-2'> 
                <div className='flex flex-col text-sm'>
                    <p><strong>author:</strong> {article.author}</p>
                    <p><strong>created:</strong> {article.created_at.slice(0,10)}</p>
                </div>
                <h2 className="md:text-2xl m-4 font-bold text-lg">{article.title}</h2>  
    
                <img src={article.article_img_url} alt=""/>  
                <div className="flex gap-10 m-4  text-sm">
                    <p><strong>votes:</strong> {article.votes}</p>
                    <p><strong>comments:</strong> {article.comment_count}</p>
                </div>
            </Link>
            { user.username === article.author && 
                <div className='flex gap-2 justify-end'>
                    <Button  variant="destructive" className="m-3" onClick={handleDelete}>Delete</Button>
                    <Button  variant="secondary" className="m-3" onClick={handleEdit}>Edit</Button>
                </div>
            }
             {err && <AlertView />}
        </section>
    )  
}

export default ArticleCard