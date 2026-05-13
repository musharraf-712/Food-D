import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

   

    useEffect(()=>{
         const verifyPayment = async () =>{
      try{
        if(!success || !orderId){
            navigate('/')
            return
        }
        const response = await axios.post(url + '/api/order/verify',{success,orderId})
        if(response.data.success){
            navigate('/myorders')
        }else{
            navigate('/')
        }
      }catch(err){
        console.log(err)
        navigate('/')
      }
    }

        verifyPayment();
    },[success,orderId,url,navigate])
   
  return (
    <div className='verify'>
        <p>Verifying your payment...</p>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify