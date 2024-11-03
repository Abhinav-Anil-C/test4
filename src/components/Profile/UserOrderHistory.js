import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
    const [OrderHistory, setOrderHistory] = useState([]); // Initialize as an empty array
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-order-history", { headers });
                setOrderHistory(response.data.data);
            } catch (error) {
                console.error("Error fetching order history:", error);
                // Optionally set OrderHistory to an empty array here on error
            }
        };
        fetch();
    }, []);

    return (
        <>
            {!OrderHistory.length && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
            {OrderHistory && OrderHistory.length === 0 && (
                <div className="h-[80vh] p-4 text-zinc-100">
                    <div className="h-[100%] flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No Order History</h1>
                        <img className="h-[20vh] mb-8" alt="Empty Order History" />
                    </div>
                </div>
            )}
            {OrderHistory && OrderHistory.length > 0 && (
                <div className="h-[100%] p-0 md:p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
                        <div className="w-[3%]">
                            <h1 className="text-center">Sr.</h1>
                        </div>
                        <div className="w-[22%]">
                            <h1>Foods</h1>
                        </div>
                        <div className="w-[19%]">
                            <h1>Price</h1>
                        </div>
                        <div className="w-[16%]">
                            <h1>Status</h1>
                        </div>
                    </div>
                    {OrderHistory.map((items, i) => (
                        <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer" key={i}>
                            <div className="w-[3%]">
                                <h1 className="text-center">{i + 1}</h1>
                            </div>
                            <div className="w-[22%]">
                                {items.food ? (
                                    <Link to={`/view-food-details/${items.food._id}`} className="hover:text-blue-300">
                                        {items.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-400">Food not available</span>
                                )}
                            </div>
                            <div className="w-[19%]">
                                <h1>₹{items.food ? items.price : "N/A"}</h1>
                            </div>
                            <div className="w-[16%]">
                                <h1 className="font-semibold text-green-500">
                                    {items.status === "Order is placed" ? (
                                        <div className="text-yellow-500">{items.status}</div>
                                    ) : items.status === "Canceled" ? (
                                        <div className="text-red-500">{items.status}</div>
                                    ) : (
                                        items.status
                                    )}
                                </h1>
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default UserOrderHistory;
