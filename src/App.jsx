import './App.css'
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import SingleArticle from './components/SingleArticle';
import DrawerDisplay from './components/DrawerDisplay';

function App() {

  return (
    <>
    <DrawerDisplay />
    <Routes>
      <Route path="/" element={ <ArticleList />} />
      <Route path="/articles" element={ <ArticleList />} />
      <Route path="/topics/:topic" element={ <ArticleList />} />
      <Route path="/articles/:article_id" element={<SingleArticle/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    </>
  )
}

export default App
