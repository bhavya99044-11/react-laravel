import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Pages/Auth/Login'
import ForgotPassword from './components/Pages/Auth/ForgotPassword'
import ResetPassword from './components/Pages/Auth/ResetPassword'
import Register from './components/Pages/Auth/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Pages/Dashboard/Layout';
import AboutUs from './components/Pages/Cms/AboutUs';
import ContactUs from './components/Pages/Cms/ContactUs';
import Faq from './components/Pages/Cms/Faq';
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
