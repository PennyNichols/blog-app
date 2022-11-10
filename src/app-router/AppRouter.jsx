import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import Details from '../pages/Details'
import Login from '../pages/Login'
import NewBlog from '../pages/NewBlog'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import UpdateBlog from '../pages/UpdateBlog'
import PrivateRouter from './PrivateRouter'

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(true)
  return (
    <>
      <Navigation />
      <Routes>
        {/* public routes */}
        <Route path="" element={<Dashboard/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />} />
        <Route path='/register' element={<Register />} />
        {/* private routes */}
        <Route path='/about' element={<PrivateRouter isAuth={isAuth} />}>
            <Route path='' element={<About />}/>
        </Route>
        <Route path='/details' element={<PrivateRouter isAuth={isAuth} />}>
            <Route path='' element={<Details />}/>
        </Route>
        <Route path='/new-blog' element={<PrivateRouter isAuth={isAuth} />}>
            <Route path='' element={<NewBlog />}/>
        </Route>
        <Route path='/update-blog' element={<PrivateRouter isAuth={isAuth} />}>
            <Route path='' element={<UpdateBlog />}/>
        </Route>
        <Route path='/profile' element={<PrivateRouter isAuth={isAuth} />}>
            <Route path='' element={<Profile />}/>
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter
