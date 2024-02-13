import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import { Toaster } from 'react-hot-toast'
import { userAuthprovider } from './context/AuthContext'
import axios from 'axios'
const App = () => {
  const { authUser } = userAuthprovider()

  axios.defaults.baseURL = "http://localhost:9000"
  axios.defaults.withCredentials = true
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}
export default App