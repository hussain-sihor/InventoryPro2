import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Intro';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Products from './pages/Products';
import Addproduct from './pages/Addproduct';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Addorder from './pages/Addorder';
import OrderReview from './pages/OrderReview';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>

        <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/addproduct' element={<PrivateRoute><Addproduct/></PrivateRoute>}/>
        <Route path='/categories' element={<PrivateRoute><Categories/></PrivateRoute>}/>
        <Route path='/orders' element={<PrivateRoute><Orders/></PrivateRoute>}/>
        <Route path='/addorder' element={<PrivateRoute><Addorder/></PrivateRoute>}/>
        <Route path='/orderreview/:id' element={<PrivateRoute><OrderReview/></PrivateRoute>}/>
      </Routes>
    </div>
  )
}

export default App

