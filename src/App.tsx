
import { Route, Routes } from 'react-router-dom'
import './App.css'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost';



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App
