import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader"; 
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



const ViewFoodDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Loading state

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    const role = useSelector((state)=> state.auth.role);
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/api/v1/get-food-by-id/${id}` // Use template literal correctly
                );
                console.log(response);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching food details:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetch();
    }, []); // Add `id` to the dependency array

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        foodid: id,
    };
    const handleFavourite= async ()=>{
        const response = await axios.put("http://localhost:1000/api/v1/add-food-to-favourite",{},{headers});
        alert(response.data.message);
    };

    const handleCart = async()=>{
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers});
        alert(response.data.message);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    if (!Data) {
        return <p className="text-gray-500">No details available.</p>; // Handle case where no data is available
    }

    return( <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
        <div className="   w-full lg:w-3/6 ">
        <div className="flex flex-col md:flex-row lg:flex-row justify-around bg-zinc-800 px-5 py-12 rounded">
        <img src={Data.url} alt="/" className="h-[30vh] md:h-[30vh] lg:h-[50vh] rounded"/>
        {isLoggedIn === true && role === "user" && <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
            <button className="bg-white rounded lg:rounded-full text-1xl lg:text-3xl p-3 text-red-500 flex items-center justify-center"
            onClick={handleFavourite}>
                <FaHeart /><span className="ms-4 block lg:hidden">Favourites</span></button>
            <button className="text-white rounded mt-0 md:mt-0 lg:rounded-full text-1xl lg:text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center"
            onClick={handleCart}>
                <FaShoppingCart /><span className="ms-4 block lg:hidden">Add to Cart</span>
                </button>
        </div>}
        {isLoggedIn === true && role === "admin" && 
        <div className="flex  flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
            <button className="bg-white rounded lg:rounded-full text-1xl lg:text-3xl p-3  flex items-center justify-center">
                <FaEdit /><span className="ms-4 block lg:hidden">Edit</span></button>
            <button className="text-red-500 rounded lg:rounded-full text-1xl lg:text-3xl p-3 mt-0 md:mt-0 lg:mt-8 bg-white flex items-center justify-center">
                <MdOutlineDeleteOutline /><span className="ms-4 block lg:hidden">Delete Food</span>
                </button>
        </div>}
        </div>
        </div>
        <div className="p-4 h-[88vh] w-full lg:w-3/6">
        <h1 className="mt-10 text-7xl text-zinc-400 font-semibold">{Data.name}</h1>
        <p className="mt-5 text-4xl text-zinc-200 font-semibold">Price: ₹ {Data.price}</p>
        </div>
    </div>
    );
};

export default ViewFoodDetails;
