import { useState } from 'react'

import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
// import {Blog} from './pages/Blog'

import { RecoilRoot } from 'recoil'
import { Dashboard } from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import { UserDashboard } from './pages/UserDashboard'
import  Header  from './componenet/Header'

import { Theme } from '@radix-ui/themes'
function App() {



const [user , setUser]=useState(null);

  return (
    <>
    <Theme>
    <Appbar user={user} setUser={setUser} />

    </Theme>



    </>
  )
}

export default App



function Appbar({user , setUser}){

  return (
    <>
      <div>
        <BrowserRouter>
          <Header  user={user}  setUser={setUser}/>
          <Routes>
            <Route
              path="/signup"
              element={<Signup user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/signin"
              element={<Signin user={user} setUser={setUser} />}
            ></Route>
            <Route path="/blog/:id" element={<Signup />}></Route>
            <Route path="/" element={<Dashboard  user={user} />}></Route>
            <Route path="/createpost" element={<CreatePost />}></Route>
            <Route path="/userboard" element={<UserDashboard   user={user} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}