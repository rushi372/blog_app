import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
export default function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Blog/>}></Route>
        <Route path='/blogs' element={<Blog/>}></Route>
        <Route path='/my-blogs' element={<UserBlogs/>}></Route>
        <Route path='/blog-details/:id' element={<BlogDetails/>}></Route>
        <Route path='/create-blog' element={<CreateBlog />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

