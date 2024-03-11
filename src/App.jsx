import './App.css'
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
    <Route path="/" element={ <ArticleList />} />
 
  </Routes>
  )
}

export default App
