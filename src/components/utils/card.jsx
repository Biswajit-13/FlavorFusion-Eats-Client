import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";


export default function EcommerceCard({ title, image, description, price, user }) {

  const [quantity, setQuantity] = useState(1); // Initialize the item count

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
      price: price * quantity,
      quantity,
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

            quantity: existingCartItem.quantity + quantity,
            price: existingCartItem.price + price * quantity,
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
    <Card className="w-full hover:cursor-pointer">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img src={image} alt="card-image" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${parseFloat(price * quantity).toFixed(2)}
          </Typography>
        </div>
        <p variant="small" color="gray" className="font-normal opacity-60">
          {description}
        </p>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDecrement}
            className="text-gray-500 bg-transparent border rounded-md px-2 py-1 hover:bg-gray-100"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="text-gray-500 bg-transparent border rounded-md px-2 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <Button
          ripple={false}
          fullWidth={false}
          onClick={handleAddToCart}
          color="black"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
