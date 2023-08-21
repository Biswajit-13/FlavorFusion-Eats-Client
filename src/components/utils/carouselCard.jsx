import React, { useState } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import { FaDollarSign } from "react-icons/fa"
import { toast } from 'react-toastify';
import axios from 'axios';

const CarouselCard = ({ user, image, title, description, price }) => {
    const [itemCount, setItemCount] = useState(1); // Initialize the item count

    const handleIncrement = () => {
      setItemCount(itemCount + 1);
    };

    const handleDecrement = () => {
      if (itemCount > 1) {
        setItemCount(itemCount - 1);
      }
    };


   const handleAddToCart = () => {
    if (!user) {
      alert("Please login to continue");
      return;
    }



    const cartItem = {
      title,
      description,
      price: price * itemCount,
      quantity: itemCount,
      email: user.email,
      image,
    };

    // Check if the item is already in the cart by sending a request to the server
    axios.get('https://flavor-fusion-eats-server.onrender.com/cart')
      .then(response => {
        const existingCartItem = response.data.find(item => item.title === cartItem.title && item.email === cartItem.email);

        if (existingCartItem) {
          // Item is already in the cart, update its quantity
          const updatedCartItem = {

            quantity: existingCartItem.quantity + itemCount,
            price: existingCartItem.price + price * itemCount,
          };

          axios.post(`https://flavor-fusion-eats-server.onrender.com/cart/update/${existingCartItem._id}`, updatedCartItem)
            .then(res => {console.log(res.data)
              toast.success('Item updated in cart!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });})
            .catch(error => console.error(error));
        } else {
          // Item is not in the cart, add it as a new item
          axios.post('https://flavor-fusion-eats-server.onrender.com/cart/add', cartItem)
            .then(res => {
              console.log(res.data)
              toast.success('Item added to cart!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            })
            .catch(error => console.error(error));
        }
      })
      .catch(error => console.error(error));
  };

    return (
        <div className="relative h-full w-full">
          <div className="h-80 md:h-96 lg:h-120 w-full overflow-hidden">
            <img
              src={image}
              alt="image 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/25 p-4">
            <div className="w-full text-center">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
               {title}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-8 opacity-80"
              >
               {description}
              </Typography>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <Typography
                  variant="paragraph"
                  color="white"
                  className="opacity-80 flex items-center"
                >
                 
                  ${parseFloat(price*itemCount).toFixed(2)}
                </Typography>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDecrement}
                    className="text-white bg-transparent border rounded-md px-2 py-1 hover:bg-white hover:text-black"
                  >
                    -
                  </button>
                  <span className="text-white font-semibold">{itemCount}</span>
                  <button
                    onClick={handleIncrement}
                    className="text-white bg-transparent border rounded-md px-2 py-1 hover:bg-white hover:text-black"
                  >
                    +
                  </button>
                </div>
                <Button
                  size="lg"
                  color="white"
                  className="mt-2 md:mt-0"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default CarouselCard;
