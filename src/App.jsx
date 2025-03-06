import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Register from './components/Auth/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Dashboard/Layout';
import AboutUs from './components/Cms/AboutUs';
import ContactUs from './components/Cms/ContactUs';
import Faq from './components/Cms/Faq';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Layout/>}>
          <Route path="/login"  element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/*" element={<ResetPassword />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="*" element={() => <div>Welcome!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
