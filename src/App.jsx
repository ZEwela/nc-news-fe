import './App.css'
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <ArticleList />} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
