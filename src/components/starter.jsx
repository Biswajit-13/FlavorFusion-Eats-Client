import React,{useState,useEffect} from 'react';
import EcommerceCard from "./utils/card";
import axios from 'axios';

const Starter = ({user}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('https://flavor-fusion-eats-server.onrender.com/items');
            const hotPicksItems = response.data.filter(item => item.itemtype === 'starter');
            setItems(hotPicksItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    return (
        <div id='starter'>
            <h2 class="mb-4 mt-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            🍽️ Appetizing Starters: Begin Your Culinary Journey with Our Irresistible Selection! 🌟
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2">
                {items.map((item, index) => (
                    <EcommerceCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        image={item.image.url}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
}

export default Starter;
