import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp = ({ email }) => {

    const navigate = useNavigate();
    const [otp, setOTP] = useState();



    console.log(email)
    
    const onVerifyOTP = async (e) => {
        e.preventDefault();

        const verificationData = {
            email: email,
            otp: parseInt(otp),
        };

        console.log(verificationData);

        try {
            const response = await axios.post('https://flavor-fusion-eats-server.onrender.com/auth/verify-otp', verificationData); // Replace with your OTP verification API endpoint
            console.log(response.data);
            console.log("Verification Successful!")
            toast.success('Account Registered, Please log in Now!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            navigate("/login")
            // You can add further logic here, like redirecting to a success page or showing a message

        } catch (error) {
            console.error('Error verifying OTP:', error);
        }

        setOTP();
    };
    return (
        <section id="otp-verification" className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">🔑 OTP Verification 🔐</h2>

                <form onSubmit={onVerifyOTP} action="#" className="space-y-8">
                    <div>
                        <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">OTP</label>
                        <input
                            type="number" // Use type="number" for numeric input
                            id="otp"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            placeholder="Enter OTP"
                            required
                        />
                    </div>
                    <Button type="submit" size="lg" color="black">
                        Verify OTP
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Otp;
