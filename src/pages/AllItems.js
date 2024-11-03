import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard/FoodCard"; 
import Loader from "../components/Loader/Loader"; 

const AllItems = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-all-foods");
                console.log("API Response:", response.data); 
    
                const foodData = response.data.data || []; 
                console.log("Food Data:", foodData); 
                
                setData(foodData); 
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);
    
    

    // Log the Data state right before rendering
    console.log("Data in AllItems:", Data);
    console.log("Loading state:", loading);

    return (
        <div className="bg-zinc-900 h-auto px-12 py-8">
            <h4 className="text-3xl text-yellow-100">All foods</h4>
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center"><Loader /></div>
            ) : (
                <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {Data.length > 0 ? (
                        Data.map((item, i) => (
                            <div key={i}>
                                <FoodCard data={item} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No items available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllItems;
