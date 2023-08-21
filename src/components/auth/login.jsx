import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { toast } from 'react-toastify';


export default function Login() {

  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home if token is present
        }
    }, [navigate]);

    const navigateToRegister = ()=>{
        navigate("/register")
    }
  

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('https://flavor-fusion-eats-server.onrender.com/auth/login', user);
            console.log(response.data);
            console.log("logged in successfully");

            // Save the token to local storage
            localStorage.setItem('token', response.data.token);
            toast.success('Loged In successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            // Redirect to the home page
            navigate('/');

        } catch (error) {
            console.error('Error logging in:', error);
        }

        setEmail('');
        setPassword('');
    };


    return (
        <section id="sign-up" className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    👋 Welcome back, Login
                </h2>
                <p className="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Create an account to get started!</p>

                <form onSubmit={onSubmit} action="#" className="space-y-8">
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
                    <Button type="submit" size="lg" color="black">
                        Login
                    </Button>
                    <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Don't have an account?{' '}
                        <span
                            onClick={navigateToRegister}
                            className="cursor-pointer text-primary-500 hover:underline"
                        >
                            Register here
                        </span>
                    </p>
                </div>
                </form>
            </div>
        </section>
    );
}
