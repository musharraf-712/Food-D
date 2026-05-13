

import { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopUp.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopUp = ({setShowPopUp}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState]= useState('sign in')
    const [ data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const handleChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
      setData((data)=>({...data,[name]:value}))
    }

    //login or register user
    const handleSubmit = async (e)=>{
      e.preventDefault()
      let newUrl = url
      if(currState === "sign in"){
        newUrl+="/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }
      try{
        const response = await axios.post(newUrl,data)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          setShowPopUp(false)
        }
      }catch(err){
        console.log(err)
        alert("response.data.message")
      }
     
  }

  return (

    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={handleSubmit}>

            <div className="login-popup-title">
                <h2>{currState}</h2>
                  <img src={assets.cross_icon} alt="" onClick={()=>setShowPopUp(false)}/>
            </div>

            <div className="login-popup-inputs">
            {currState==="sign up"? <input type="text" name='name' onChange={handleChange} value={data.name} placeholder='username' required />:<></>} 
            <input type="email" name='email' onChange={handleChange} value={data.email} placeholder='email' required />
            <input type="password" name='password' onChange={handleChange} value={data.password} placeholder='*****' required/>
            </div>
            
            <button type='submit'>{currState==="sign up"?"Create account":"sign in"}</button>

            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>  
            </div>

              {currState==='sign in'?   <p>Create a new account <span onClick={()=>setCurrState('sign up')}>
                     Sign up</span></p>:<p>already have an account? <span onClick={()=>setCurrState('sign in')}>
                     Sign in</span></p>}

        </form>
    </div>

  )
}

export default LoginPopUp