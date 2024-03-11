import './App.css'
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import ArticleView from './components/ArticleView';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <ArticleList />} />
      <Route path="/articles" element={ <ArticleList />} />
      <Route path="/articles/:article_id" element={<ArticleView/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
