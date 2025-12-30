import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomeLayout from '@/layouts/HomeLayout'
import MainLayout from '@/layouts/MainLayout'

import Home from '@/pages/Home'
import BuyerCart from '@/pages/BuyerCart'
import BuyerTransaction from '@/pages/BuyerTransaction'
import BuyerProfile from './pages/BuyerProfile'
import Product from './pages/Product'

import SignUp from './pages/SignUp'
import DetailOrderTransaction from './pages/DetailOrderTransaction'
import LoginSignUpLayout from './layouts/LoginSignUpLayout'
import Login from './pages/Login'
import { ProtectedRoute } from './lib/ProtectedRoute'
import Dashboard from './components/Dashboard'


import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path='/' element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          } />

          <Route path='/product/:id' element={
            <MainLayout>
              <Product />
            </MainLayout>
          } />

          <Route path='/signup' element={
            <LoginSignUpLayout>
              <SignUp />
            </LoginSignUpLayout>
          } />

          <Route path='/login' element={
            <LoginSignUpLayout>
              <Login />
            </LoginSignUpLayout>
          } />

          <Route element={<ProtectedRoute />}>

            <Route path='/cart' element={
              <MainLayout>
                <BuyerCart />
              </MainLayout>
            } />

            <Route path=
              '/transaction' element={
                <MainLayout>
                  <BuyerTransaction />
                </MainLayout>
              } />

            <Route path='/profile' element={
              <MainLayout>
                <BuyerProfile />
              </MainLayout>
            } />

            <Route path='/transaction/:id' element={
              <MainLayout>
                <DetailOrderTransaction />
              </MainLayout>
            } />

          </Route>

          {/* <Route path='/dashboard' element={
            <Dashboard />
        } /> */}


          <Route path='*' element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          } />
        </Routes>
      </Router>
    </>

  )
}

export default App
