'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {app} from '../../config'

const myOrders = ({ params }) => {

    const auth = getAuth(app);

    const [myOrders, setMyOrders] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [otp, setOtp] = useState("");
    const [ confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
      
        const fetchOrders = async() => {
            // debugger;
            const res = await fetch(`/api/users/${params.id}/orders`,{
                method: 'GET',
            })
            const data = await res.json()
            setMyOrders(data)
        }

        if(myOrders == null){
            fetchOrders()
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size': 'invisible',
            'callback': (response) => {
                // sendOtp();
                console.log("Recaptcha verified");
            },
            // 'expired-callback': () => {
            //     console.log("Recaptcha expired");
            // },
            // defaultCountry: "IN"
        });
    }, [auth])

    const handleReturn = async() => {
        var input = document.getElementById("otp");

        if (input.classList.contains("hidden")) {
            input.classList.remove("hidden");
        } else {
            input.classList.add("hidden");
        }
    }
    const removeOrder = async (order) => {
        debugger;
        const res = await fetch(`/api/order/${order._id}`,{
            method: 'PUT',
            body: JSON.stringify({
                productId: order.product._id,
            })
        })
        if(res.ok) {alert("Product Successfully Returned");}
        
        
    }
    const sendOtp = async(contact) => {
        debugger;
        setSubmitting(true)
        // Code for sending otp to owner..
        
        try {
            const formattedPhoneNumber = "+91" + contact;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setSentOtp(true);
            alert('OTP has been sent');
        } catch (error) {
            console.error(error);
            // Handle error (logging, alert, etc.)
        }
        setOtpSent(true)
        setSubmitting(false)
    }

    const verifyOTP = async(order) => {
        debugger;
        setSubmitting(true)
        // Code for Verifying ..
        console.log(otp);
        await confirmationResult.confirm(otp)
        .then(async res => {
            removeOrder(order);
        })
        .catch(err => {
            console.log(err);
            alert("Invalid OTP");
        })
        setOtpSent(false)
        setSubmitting(false)
    }
    
  return (
    <div className='flex flex-col items-center'>
        <div className="content flex flex-col gap-3 items-start">
            <div className="head">
                <h1>My Orders</h1>
            </div>
            <div id="recaptcha-container"></div>
            <div className="list flex flex-col gap-4">
                {myOrders?.map((order) => (
                    <div className="orderCard flex flex-row gap-10 bg-slate-300 p-4 rounded-lg">
                        <div className="img rounded-md">
                            <Image className="img rounded-md" src={order.product.image} width={250} height={100}/>
                        </div>
                        <div className="details flex flex-col items-start gap-1 text-lg">
                            <h1 className='font-light'><span className='font-medium'>Product:&nbsp;</span>{order?.product.name}</h1>
                            <h1 className='font-light'><span className='font-medium'>Rate:&nbsp;</span>{order?.product.price}</h1>
                            <Link href={`../profile/${order.owner._id}`}>
                                <h1 className='font-light'><span className='font-medium'>Owner:&nbsp;</span>{order?.owner.name}</h1>
                            </Link>
                            <h1 className='font-light'><span className='font-medium'>Contact:&nbsp;</span>{order?.owner.phone}</h1>
                            <h1 className='font-light'><span className='font-medium'>Ordered on:&nbsp;</span>{order?.createdAt.substring(0,10)}</h1>
                        </div>
                        {order.status=="OPEN" ?  <div className="return-btn">
                        <button className='green1 text-white px-3 py-2' onClick={handleReturn}>Return</button>
                            <div id='otp' className="otp hidden"> {/* Is div ke andar form bana. */}
                                <input type="number" id='otp-input' className='my-3 w-36 p-1 border-[1px] border-black' placeholder='Enter OTP' onChange={(e) => {setOtp(e.target.value)}}/>
                                <button className='green1 text-white px-3 py-2 mx-4' id='otp-btn' onClick={otpSent?  () => {verifyOTP(order)} : () => {sendOtp(order.owner.phone)}}>{otpSent?"Verify":"Send OTP"}{submitting?"..":""}</button>
                            </div>
                        </div> : <h1>status returned!</h1>}
                       
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default myOrders