import React, { Component, useState } from 'react';
import { Button } from '@material-tailwind/react';
import axios from "axios"


export default function BookTable() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const booking = {
            username: username,
            email: email,
            phone: phone,
            date: date,
            guests: guests,
            time: time,
        }
        console.log(booking);
        axios.post('https://flavor-fusion-eats-server.onrender.com/bookings/add', booking)
            .then(res => console.log(res.data));

        setUsername('');
        setEmail('');
        setPhone('');
        setDate(new Date());
        setTime('');
        setGuests('');

    }



    return (
        <section id='book-table' className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">🍽️ Book a Table 📅</h2>
                <p className="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Ready to enjoy a delicious meal? Reserve your table now!</p>
                <p className="mb-8 lg:mb-16 font-light text-center text-pink-500 dark:text-gray-400 sm:text-xl">Hurry up! only 20 left</p>

                <form onSubmit={onSubmit} action="#" className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                        <input value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@domain.com" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone Number</label>
                        <input value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Phone Number" required />
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                        <input value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date" id="date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
                    </div>
                    <div>
                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Time</label>
                        <input value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time" id="time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="partySize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Party Size</label>
                        <input
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            type="number" id="partySize" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Number of Guests" required />
                    </div>
                    <Button type='submit' onClick={onSubmit} size="lg" color="black">
                        Reserve Table
                    </Button>
                </form>
            </div>
        </section>
    );
}

