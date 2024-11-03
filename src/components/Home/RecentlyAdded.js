import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../FoodCard/FoodCard"; // Ensure this import is correct
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-recent-foods");
                setData(response.data.data || []);
            } catch (error) {
                console.error("Error fetching recent foods:", error);
            } finally {
                setLoading(false); // Set loading to false after the fetch
            }
        };
        fetch();
    }, []);

    return (
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently added foods</h4>
            {loading ? ( // Use loading state to show loader
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            ) : (
                <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {Data.length > 0 ? (
                        Data.map((item, i) => (
                            <div key={i}>
                                <FoodCard data={item} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No recent foods available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecentlyAdded;
