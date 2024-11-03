import React, { useState } from "react";
import axios from "axios";

const AddFood = () => {
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodImageUrl, setFoodImageUrl] = useState("");

    const handleAddFood = async () => {
        if (!foodName || !foodPrice || !foodImageUrl) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // Fetch ID and token from localStorage
            const id = localStorage.getItem("id");
            const token = localStorage.getItem("token");

            // Make a request to add the food item
            const response = await axios.post(
                "http://localhost:1000/api/v1/add-food",
                {
                    url: foodImageUrl,
                    name: foodName,
                    price: parseFloat(foodPrice), // Ensure price is sent as a number
                },
                {
                    headers: {
                        id: id,
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);
            // Clear input fields after adding
            setFoodName("");
            setFoodPrice("");
            setFoodImageUrl("");
        } catch (error) {
            console.error(error);
            alert("Failed to add food");
        }
    };

    return (
        <div className="bg-zinc-900 p-8 h-screen flex flex-col items-center">
            <h1 className="text-4xl text-zinc-200 font-bold mb-6">Add Foods</h1>
            <div className="flex flex-col space-y-4 w-1/2">
                <input
                    type="text"
                    className="p-3 bg-zinc-800 text-white rounded border border-zinc-700"
                    placeholder="Enter Food Name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                />
                <input
                    type="number"
                    className="p-3 bg-zinc-800 text-white rounded border border-zinc-700"
                    placeholder="Enter Food Price"
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                />
                <input
                    type="text"
                    className="p-3 bg-zinc-800 text-white rounded border border-zinc-700"
                    placeholder="Enter Image URL"
                    value={foodImageUrl}
                    onChange={(e) => setFoodImageUrl(e.target.value)}
                />
                <button
                    className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-all duration-150"
                    onClick={handleAddFood}
                >
                    Add Food
                </button>
            </div>
        </div>
    );
};

export default AddFood;
