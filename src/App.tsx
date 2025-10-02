
import { Route, Routes } from 'react-router-dom'
import './App.css'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/view/:id" element={<ViewPost/>} />
        <Route path="/edit/:id" element={<EditPost/>} />
      </Routes>
    </>
  );
}

export default App
