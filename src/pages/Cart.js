import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [Cart, setCart] = useState([]); // Initialize as an empty array
    const [Total, setTotal] = useState(0);
    const [showReceipt, setShowReceipt] = useState(false); // State to control receipt modal
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                "http://localhost:1000/api/v1/get-user-cart",
                { headers }
            );
            setCart(res.data.data); // Ensure it's an array
        };
        fetch();
    }, [Cart]);

    const deleteItem = async (foodid) => {
        const response = await axios.put(
            `http://localhost:1000/api/v1/remove-from-cart/${foodid}`,
            {},
            { headers }
        );
        alert(response.data.message);
    };

    useEffect(() => {
        if (Cart && Cart.length > 0) {
            let total = 0;
            Cart.map((items) => {
                total += items.price;
            });
            setTotal(total);
            total = 0;
        }
    }, [Cart]);

    const PlaceOrder = async () => {
        try {
            const response = await axios.post(
                "http://localhost:1000/api/v1/place-order",
                { order: Cart },
                { headers }
            );
            alert(response.data.message);
            navigate("/profile/orderHistory");
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowReceipt = () => {
        setShowReceipt(true);
    };

    const handleCloseReceipt = () => {
        setShowReceipt(false);
    };

    const handleConfirmOrder = () => {
        setShowReceipt(false);
        PlaceOrder();
    };

    return (
        <div className="bg-zinc-900 px-60 h-screen py-8">
            {!Cart.length && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
            {Cart.length === 0 && (
                <div className="h-screen">
                    <div className="h-[100%] flex items-center justify-center flex-col">
                        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                            Empty Cart
                        </h1>
                        <img
                            src=""
                            alt=""
                            className="lg:h-[50vh] text-black-900"
                        />
                    </div>
                </div>
            )}
            {Cart.length > 0 && (
                <>
                    <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                        Your Cart
                    </h1>
                    {Cart.map((items, i) => (
                        <div
                            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                            key={i}
                        >
                            <img
                                src={items.url}
                                alt="/"
                                className="h-[20vh] md:h-[10vh] object-cover"
                            />
                            <div className="w-full md:w-auto">
                                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                                    {items.name}
                                </h1>
                            </div>
                            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                                    ₹{items.price}
                                </h2>
                                <button
                                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                                    onClick={() => deleteItem(items._id)}
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {Cart && Cart.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-end">
                    <div className="p-4 bg-zinc-800 rounded">
                        <h1 className="text-3xl text-zinc-200 font-semibold">
                            Total Amount
                        </h1>
                        <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                            <h2>{Cart.length} foods</h2> <h2>₹{Total}</h2>
                        </div>
                        <div className="w-[100%] mt-3">
                            <button
                                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semifold hover:bg-zinc-200"
                                onClick={handleShowReceipt}
                            >
                                Place your order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-zinc-800 rounded-lg p-8 w-1/3">
                        <h1 className="text-3xl text-zinc-100 font-semibold mb-6">
                            Order Receipt
                        </h1>
                        <div className="flex flex-col text-zinc-200">
                            {Cart.map((item, index) => (
                                <div key={index} className="flex justify-between mb-2">
                                    <span>{item.name}</span>
                                    <span>₹{item.price}</span>
                                </div>
                            ))}
                            <hr className="my-4" />
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>₹{Total}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleCloseReceipt}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleConfirmOrder}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
