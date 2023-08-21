import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const Cart = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    const user = JSON.parse(decodeURIComponent(userParam));
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://flavor-fusion-eats-server.onrender.com/cart`)
            .then(response => {
                const userCart = response.data.filter(item => item.email === user.email);
                setCartItems(userCart);
            })
            .catch(error => {
                console.error(error)
                console.error('Error placing order:', error);
                toast.error('An error occurred while placing the order.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                })
            }
            );
    }, [user]);

    //delete items from cart
    const handleDeleteItem = (itemId) => {
        axios.delete(`https://flavor-fusion-eats-server.onrender.com/cart/delete/${itemId}`)
            .then(response => {
                if (response.status === 200) {
                    setCartItems(cartItems.filter(item => item._id !== itemId));
                }
                console.error('Error placing order:', error);
                toast.error('Item deleted from cart', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            .catch(error => console.error(error));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const totalCartPrice = calculateTotalPrice();

    //place order
    const handleOrder = () => {
        const order = {
            order: cartItems,
            email: user.email,
            totalPrice: totalCartPrice,
        };
        
        console.log(order);
        
        // First, place the order
        axios.post('https://flavor-fusion-eats-server.onrender.com/orders/add', order)
            .then(res => {
                console.log(res.data);
                toast.success('Order placed successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
                navigate("/")
                // After placing the order, delete the cart items
                const deletePromises = cartItems.map(item => {
                    return axios.delete(`https://flavor-fusion-eats-server.onrender.com/cart/delete/${item._id}`)
                        .catch(error => {
                            console.error('Error deleting cart item:', error);
                            toast.error('An error occurred while deleting cart items.', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                        });
                });
    
                Promise.all(deletePromises)
                    .then(() => {
                        console.log('Cart items deleted successfully');
                        // Clear the cart items in your local state
                        setCartItems([]);
                    });
            })
            .catch(error => {
                console.error('Error placing order:', error);
                toast.error('An error occurred while placing the order.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            });
    };
    

    return (
        <div class='mx-auto max-w-screen-xl lg:py-5 lg:px-6 gap-3 flex flex-col'>
            <h2 class="mb-4 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item._id} class="flex items-center space-x-4 p-4 border-b border-gray-300 dark:border-gray-700">
                        <img
                            src={item.image} // Replace with the actual image source
                            alt={item.title}
                            class="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                            <p class="text-gray-500 dark:text-gray-400">{item.description}</p>
                            <div class="flex items-center justify-between w-full">
                                <p class="text-gray-700 dark:text-gray-300 ">${item.price}</p>
                                <div class="flex items-center space-x-2">
                                    <p class="text-gray-700 dark:text-gray-300">Quantity: {item.quantity}</p>
                                    <button
                                        onClick={() => handleDeleteItem(item._id)}
                                        class="text-red-500 dark:text-red-400"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-6">
                <p className="text-gray-700 dark:text-gray-300 font-medium">Total Price:</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">${calculateTotalPrice().toFixed(2)}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-bold">Payment Options:</p>
            <Checkbox id="COD" label="Cash On Delivery" ripple={true} />
            <Checkbox id="CARD" label="Card" ripple={true} />
            <Checkbox id="OB" label="Net Banking" ripple={true} />


            <div className="mt-6 text-center">
                <Button size="lg" color="black" onClick={handleOrder}>
                    Place Order
                </Button>
            </div>

        </div>

    );
}

export default Cart;
