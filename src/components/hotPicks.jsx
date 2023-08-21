import React,{useState,useEffect} from 'react';
import EcommerceCard from "./utils/card";
import item1 from "../assets/item1.jpg";
import item2 from "../assets/item2.jpg";
import item3 from "../assets/item3.jpg";
import axios from "axios"

const HotPicks = ({user}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('https://flavor-fusion-eats-server.onrender.com/items');
            const hotPicksItems = response.data.filter(item => item.itemtype === 'hotpicks');
            setItems(hotPicksItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div id='hotpicks'>
        <h2 className="mb-4 mt-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">🔥 Hot Picks: Feast Your Eyes on Our Best Dishes! 🔥 </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2">
            {items.map((item, index) => (
                <EcommerceCard
                    key={item._id}
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

export default HotPicks;
