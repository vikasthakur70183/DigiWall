import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'
import {Header,Footer} from './components'

function App() {
  const [loading,SetLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authService.getCurrentuser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else
      {
        dispatch(logout())
      }
    })
    .finally(()=>SetLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header/>
      <main>
       TODO: <Outlet/>
      </main>
      <Footer/>
      </div>
    </div>) : null
}

export default App
