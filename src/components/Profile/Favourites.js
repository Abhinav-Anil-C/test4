import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../FoodCard/FoodCard";

const Favourites = () => {
    const [FavouriteFoods, setFavouriteFoods] = useState([]); // Initialize as an empty array
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetch = async () => {
        
                const response = await axios.get("http://localhost:1000/api/v1/get-favourite-foods", { headers });
                setFavouriteFoods(response.data.data || []); 
        };
        fetch();
    }, [FavouriteFoods]);

    return ( 
        <>{FavouriteFoods.length === 0 && (
            <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full flex-col bg-white">
                No Favourite Food
                <img src="https://th.bing.com/th/id/OIP.1tHl4-io1JWk07mHfVmDgQHaHa?rs=1&pid=ImgDetMain" alt="" className="h-[20vh] my=8"/></div>
        )}  
        <div className="grid grid-cols-3 gap-4">
        
        {
            FavouriteFoods &&
            FavouriteFoods.map((item, i) => (
                <div key={item._id || i}> {/* Use a unique key */}
                    <FoodCard data={item} favourite={true} />
                </div>
            ))}
    </div>
        </>
        
    );
};

export default Favourites;
