import React,{useState,useEffect} from "react";
import { Carousel} from "@material-tailwind/react";
import axios from "axios";

import CarouselCard from "./utils/carouselCard";
// import Button from "./utils/button"

export default function Top({user}) {


  const [items, setItems] = useState([]);

  useEffect(() => {
      fetchItems();
  }, []);

  const fetchItems = async () => {
      try {
          const response = await axios.get('https://flavor-fusion-eats-server.onrender.com/items');
          const hotPicksItems = response.data.filter(item => item.itemtype === 'banner');
          setItems(hotPicksItems);
      } catch (error) {
          console.error('Error fetching items:', error);
      }
  };

  return (
    <div id="topdelights" className="lg:mb-5 lg:pb-10 lg:py-5">
         <h2 class="mb-4 pb-5 mt-10 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
      🌟 Top Delights: Indulge in Our Culinary Masterpieces! 🍽️
        </h2>
    <Carousel className="rounded-xl" loop={true}>
      {items.map((item, index) => (
        <CarouselCard
          key={index}
          title={item.title}
          description={item.description}
          price={item.price}
          image={item.image.url}
          user={user}
        />
      ))}
    </Carousel>
    </div>
  );
}