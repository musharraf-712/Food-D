import { useContext, useState } from 'react'
import {assets} from './../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function Navbar ({setShowPopUp}){
    const [menu,setMenu] = useState('home')
    const {getTotalCartAmount} = useContext(StoreContext)
    const {token,setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }
    
    return(
        <>
            <nav>
                <div className="navLogo">
                   <Link to='/'> <img src={assets.logo} alt="" /></Link> 
                </div>

                <div className="navMid">
                    <ul>
                        <Link to={'/'} onClick={()=>setMenu('home')} className={menu==='home'?'active':''}>home</Link>
                        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==='menu'?'active':''}>menu</a>
                        <a href='#add-download' onClick={()=>setMenu('mobile')} className={menu==='#mobile'?'active':''}>mobile app</a>
                        <a href='#footer' onClick={()=>setMenu('contact')} className={menu==='contact'?'active':''}>contect us</a>
                    </ul>
                </div>
                <div className="navRight">
                    <div className="navSearch">
                        <img src={assets.search_icon} alt="" />
                    </div>
                    <div className="navCart">
                       <Link to='/cart'>  <img src={assets.basket_icon} alt="" /></Link>
                       <div className={getTotalCartAmount()===0?"" : 'dot'}></div>
                        
                    </div>
                   <div className="account">

                        {!token?   <button onClick={()=>setShowPopUp(true)}>Sign in</button> :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                
                <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p >Orders</p></li>
                <hr />  
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>}
                         
                        
                    
                   </div>
                </div>

            </nav>
        </>
    )
}
export default Navbar