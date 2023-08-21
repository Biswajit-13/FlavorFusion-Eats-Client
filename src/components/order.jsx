import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";
import { HomeIcon, BellIcon, CurrencyDollarIcon, ArrowRightIcon, CheckIcon, CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { toast } from 'react-toastify';



const Order = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    const user = JSON.parse(decodeURIComponent(userParam));

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`https://flavor-fusion-eats-server.onrender.com/orders`) // Adjust the endpoint URL accordingly
            .then(response => {
                const userOrders = response.data.filter(order => order.email === user.email);
                setOrders(userOrders);
            })
            .catch(error => console.error(error));
    }, [user]);


    const handleDeleteOrder = (orderId) => {
        axios.delete(`https://flavor-fusion-eats-server.onrender.com/orders/delete/${orderId}`)
            .then(response => {
                if (response.status === 200) {
                    setOrders(orders.filter(order => order._id !== orderId));
                }
                console.log(response.data)
                toast.error('Order Deleted!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // Auto close after 2000 milliseconds (2 seconds)
                });
            })
            .catch(error => console.error(error));
    };
    return (
        <div className="mx-auto max-w-screen-xl py-10 px-6">
            <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-900 dark:text-white">Your Orders</h1>
            <ul className="space-y-8">
                {orders.map(order => (
                    <li key={order._id} className="border rounded-lg p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Order ID: {order._id}</h2>
                        <ul className="mt-4 space-y-2 border-b-2 p-6">
                            {order.order.map(item => (
                                <li key={item._id} className="flex items-center space-x-4">
                                    <img
                                        src={item.image} // Replace with the actual image source
                                        alt={item.title}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Price: ${item.price}</p>
                                        <p className="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='item-center justify-between p-2 mb-5'>
                            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Total Price: ${order.totalPrice.toFixed(2)}</h2>
                            <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="text-red-500 font-medium hover:underline dark:text-red-400"
                            >
                                Delete Order
                            </button>
                        </div>

                        {order.isConfirmed == false && (
                            <Timeline>
                                <TimelineItem>
                                    <TimelineConnector />
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='light-green' variant='ghost' className='text-opacity-40'>
                                            <CheckCircleIcon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="light-green" className="leading-none text-opacity-40">
                                            Order Verification
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        <Typography variant="small" color="gary" className="font-normal text-gray-400">
                                            We will proceed with your order once it is verified!
                                        </Typography>
                                    </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                        )}

                        {order.isConfirmed == true && (
                            <Timeline>
                                <TimelineItem>
                                    <TimelineConnector />
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='green' variant='ghost'>
                                            <CheckCircleIcon className="bg-green h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="green" className="leading-none">
                                            Order Verified
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                            Your order has been verified and is being currently cooked by our chef!
                                        </Typography>
                                    </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                        )}

                        {order.isOutForDelivery == false && (
                            <Timeline>
                                <TimelineItem>
                                    <TimelineConnector />
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='light-green' variant='ghost' className='text-opacity-40'>
                                            <CheckCircleIcon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="light-green" className="leading-none text-opacity-40">
                                            Out for Delivery
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                    </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                        )}

                        {order.isOutForDelivery == true && (
                            <Timeline>
                                <TimelineItem>
                                    <TimelineConnector />
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='green' variant='ghost'>
                                            <CheckCircleIcon className="bg-green h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="green" className="leading-none">
                                            Out for Delivery
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                            Your food will be at your doorsteps in a while.
                                        </Typography>
                                    </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                        )}

                        {order.isDelivered == false && (
                            <Timeline>
                                <TimelineItem>

                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='light-green' variant='ghost' className='text-opacity-40'>
                                            <CheckCircleIcon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="light-green" className="leading-none text-opacity-40">
                                            Delivered
                                        </Typography>
                                    </TimelineHeader>
                                </TimelineItem>
                            </Timeline>
                        )}

                        {order.isDelivered == true && (
                            <Timeline>
                                <TimelineItem>
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon color='green' variant='ghost'>
                                            <CheckCircleIcon className="bg-green h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="green" className="leading-none">
                                            Delivered
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                            Enjoy your food
                                        </Typography>
                                    </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                        )}

                    </li>

                ))}
            </ul>
        </div>
    );
}

export default Order;
