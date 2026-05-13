import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


function App() {
 const [showPopUp,setShowPopUp] = useState(false)

  return (
    <>
     {showPopUp?<LoginPopUp setShowPopUp={setShowPopUp}/>:<></>}
    <div className="app">
      <Navbar showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path = '/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
    </Routes>
    
    </div>
    <Footer/>
   

    </>
  )
}

export default App
