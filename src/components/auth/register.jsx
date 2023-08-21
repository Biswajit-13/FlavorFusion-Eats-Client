import React, { useState, useEffect } from 'react';
import Otp from './otp'; // Import your OTP component
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { toast } from 'react-toastify';


export default function Register() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('')


    const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home if token is present
        }
    }, [navigate]);


    const navigateToLogin = () => {
        navigate("/login")
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            email: email,
            password: password,
            address: address,
            pin: pin,
        };

        try {
            const response = await axios.post('https://flavor-fusion-eats-server.onrender.com/auth/register', user); // Replace with your signup API endpoint
            console.log(response.data);
            console.log('Verification mail sent');
            setOtpSent(true); // Set OTP sent status
            localStorage.setItem('verificationToken', response.data.verificationToken);
            toast.info('Check your email for OTP', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        } catch (error) {
            console.error('Error signing up:', error);
        }

        setUserName('');
        // setEmail('');
        setPassword('');
    };

    return (
        <section id="sign-up" className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">


                {otpSent ? ( // Display OTP input form if OTP has been sent
                    <Otp email={email} />
                ) : (
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                        <h2 className="mb-4 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">🔒 Sign Up 🔐</h2>
                        <p className="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Create an account to get started!</p>
                        <form onSubmit={onSubmit} action="#" className="space-y-8">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    id="name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="name@domain.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address:
                                    <p className='text-muted text-gray-400'>street, town, city, state</p></label>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    id="address"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pin code</label>
                                <input
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    type="text"
                                    id="pin"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <Button type="submit" size="lg" color="black">
                                Sign Up
                            </Button>
                            <div className="text-center">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <span
                                        onClick={navigateToLogin}
                                        className="cursor-pointer text-primary-500 hover:underline"
                                    >
                                        Signin here
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
