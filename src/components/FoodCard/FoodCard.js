import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const FoodCard = ({data, favourite})=>{
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        foodid:data._id,
    };

    const handleRemoveFood = async()=>{
        const response = await axios.put("http://localhost:1000/api/v1/remove-food-from-favourite",
            {},
            {headers}
        );
        alert(response.data.message);
    }
    return  (
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <Link to={`/view-book-details/${data._id}`}>
        <div className="">
            <div className="bg-zinc-900 rounded flex items-center justify-center">
                <img src={data.url} alt="/" className="h-[30vh]"/></div>
                <h2 className="mt-4 text-xl text-white font-semibold" >{data.name}</h2>
                <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
                
        </div>
        </Link>
        {favourite && (
            <button className="bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
            onClick={handleRemoveFood}
            >
                Remove from favourite
            </button>
        )}
        </div>
    );
};
//  <div>
//     <Link to={`/view-book-details/${data._id}`}>
//     <div className="bg-zinc-800 rounded p-4 flex flex-col">
//         <div className="bg-zinc-900 rounded flex items-center justify-center">
//             <img src={data.url} alt="/" className="h-[30vh]"/></div>
//             <h2 className="mt-4 text-xl text-white font-semibold" >{data.name}</h2>
//             <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
            
//     </div>
//     </Link>
//     {favourite && (
//         <button className="bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
//         onClick={handleRemoveFood}
//         >
//             Remove from favourite
//         </button>
//     )}
//     </div>;


export default FoodCard;