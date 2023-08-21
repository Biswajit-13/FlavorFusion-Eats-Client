import React from 'react';
import NavBar from "./components/navBar";
import HotPicks from './components/hotPicks';
import About from './components/about';
import Contact from './components/contact';
import Top from './components/top';
import Starter from './components/starter';
import BookTable from './components/book';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/auth/register';
import Login from './components/auth/login';
import Otp from './components/auth/otp';
import Home from './home';
import Cart from "./components/cart";
import Order from './components/order';

const App = () => {


  return (
    <Router>
      <Routes>
      {/* <Route path='/' element={
          <div class='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
            <NavBar />
            <Top />
            <HotPicks />
            <Starter />
            <About />
            <BookTable />
            <Contact />
          </div>
        } /> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/register' element={
          <div class='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
            <Register />
          </div>}
        />
         <Route path='/login' element={
          <div class='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
            <Login />
          </div>}
        />
         <Route path='/verify-otp' element={
          <div class='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
            <Otp />
          </div>}
        />
      </Routes>
    </Router>

  );
}

export default App;
