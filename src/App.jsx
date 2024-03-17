import './output.css'
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import SingleArticle from './components/SingleArticle';
import DrawerDisplay from './components/DrawerDisplay';
import Header from './components/Header';
import AddArticle from './components/AddArticle';

function App() {

  return (
    <>
    <Header/>
    <DrawerDisplay />
    <Routes>
      <Route path="/" element={ <ArticleList />} />
      <Route path="/articles" element={ <ArticleList />} />
      <Route path="/topics/:topic" element={ <ArticleList />} />
      <Route path="/My-articles" element={ <ArticleList />} />
      <Route path="/articles/:article_id" element={<SingleArticle/>} />
      <Route path='/Add-article' element={<AddArticle/>}/>
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    </>
  )
}

export default App
