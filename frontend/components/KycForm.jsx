"use client";
import { useSession } from 'next-auth/react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {app} from '../app/config'
import React, { useEffect, useState } from 'react'

const KycForm = () => {

    const auth = getAuth(app);

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size': 'invisible',
            'callback': (response) => {
                sendOtp();
                console.log("Recaptcha verified");
            },
            'expired-callback': () => {
                console.log("Recaptcha expired");
            },
            defaultCountry: "IN"
        });
    }, [auth]);

    const {data: session} = useSession();
    const [formInputs, setFormInputs] = useState({
        contact: '',
        address: '',
        aadharNo: 0,
        aadharImage:''
    });
    const [otp, setOtp] = useState("");
    const [ confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setSentOtp] = useState(false);

    // const sendOtp = (event) => {
    //     event.preventDefault();
    //     configureCaptcha();
    //     let pn = "+91" + formInputs.contact;
    //     let av = window.recaptchaVerifier;
    //     firebase.auth().signInWithPhoneNumber(pn, av)
    //         .then(res => {
    //             setFinal(res);
    //             console.log(res);
    //             console.log("OTP sent");
    //             alert("OTP sent");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            const formattedPhoneNumber = "+91" + formInputs.contact;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setSentOtp(true);
            alert('OTP has been sent');
        } catch (error) {
            console.error(error);
            // Handle error (logging, alert, etc.)
        }
    }

    // const hadleOtpSubmit = async () => {
    //     try{
            
    //         setOtp('');
    //     }
    //     catch(err) {
    //         console.log(err);
    //     }
    // }

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        const form = e.currentTarget;
        const fileInput = Array.from(form.elements).find(({name}) => name === 'file')
        //console.log(fileInput);
        const formData = new FormData();

        for( const file of fileInput.files ){
            formData.append('file', file);
        }

        formData.append('upload_preset','vtxkm6s0')

        const data = await fetch('https://api.cloudinary.com/v1_1/dcsvvfai3/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json());
        console.log(data);
        await confirmationResult.confirm(otp)
            .then(async res => {
                try {
                    const response = await fetch(`api/users/${session?.user.id}/`,{
                        method: 'PUT',
                        body: JSON.stringify({
                            contact: formInputs.contact,
                            address: formInputs.address,
                            aadharNo: formInputs.aadharNo,
                            aadharImage: data.secure_url,
                        })
                    })
                    
                    if(response.ok){
                        console.log("Successfully Submitted")
                        location.reload();
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(err => {
                console.log(err);
                alert("Invalid OTP");
            })
        
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        if(!file.type.includes('image')) {
            return alert('Please upload an image file');
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result;

            setFormInputs({ ...formInputs,aadharImage:result });;
        }
        
    };
  return (
    <section className='flex flex-col items-center'>
        <div className="form-container w-3/4">
            <h1 className='text-2xl font-bold'>Fill your details to continue to app</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div id="recaptcha-container"></div>
                <div className="input flex flex-row">
                    <p>Contact No:</p>
                    <input type="tel" name="phone" id="phone-no" onChange={(e) => setFormInputs({...formInputs, contact:e.target.value})}/>
                </div>
                <div className="input flex flex-row gap-3">
                    <p>Address:</p>
                    <input type="text" name="address" id="address" onChange={(e) => setFormInputs({...formInputs, address:e.target.value})}/>
                </div>
                <div className="input flex flex-row">
                    <p>Aadhar card:</p>
                    <input type="file" name="file" id="aadhar" onChange={handleImageChange}/>
                </div>
                <div className="input flex flex-row gap-3">
                    <p>Aadhar No:</p>
                    <input type="number" name="aadharNo" id="aadharNo" onChange={(e) => setFormInputs({...formInputs, aadharNo:e.target.value})}/>
                </div>
                
                <button type="submit" className='explore_btn'>Submit</button>
                <button type="reset">Reset</button>
            </form>
            <form className='flex flex-col gap-4' onSubmit={sendOtp}>
            <button type="submit" className='explore_btn'>Generate OTP</button>
                <div className="input flex flex-row gap-3">
                    <p>OTP:</p>
                    <input type="number" name="otp" id="otp" onChange={(e)=>setOtp(e.target.value)} />
                </div>
            </form>

        </div>
    </section>
  )
}

export default KycForm