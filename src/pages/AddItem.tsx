import React from "react";
import { useState } from "react";
const AddItem: React.FC = () => {
    const [carName, setCarName] = useState<string>("");
    const [carBrand, setCarBrand] = useState<string>("");
    const [carImageUrl, setCarImageUrl] = useState<string>("");
    const [carPrice, setCarPrice] = useState<number>(0);
    const [carDescription, setCarDescription] = useState<string>("");
    const [carStatus, setCarStatus] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const CAR_SERVICE_API_URL = "http://localhost:8000/api/cars";

    const addNewItem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage("Please log in to add a new item.");
            return;
        }
        const data = {
            name: carName,
            brand: carBrand,
            image_url: carImageUrl,
            price: carPrice,
            description: carDescription,
            is_available: carStatus == "Available" ? true : false,
        };
        try {
            const response = await fetch(`${CAR_SERVICE_API_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to add new item");
            }

            const result = await response.json();
            setMessage("Item added successfully!");
            window.location.href = "/";
            console.log(result);
        } catch (error) {
            console.error("Error adding item:", error);
            setMessage("Failed to add item. Please try again.");
        }
    };

    
    
    return (
        <section className="flex flex-col items-center bg-[#0F172A] py-15">
            <div className="container">
                <div className="relative mx-auto w-full max-w-lg rounded-[20px] bg-white/10 p-4 shadow-lg">
                    <div className="border-dark-6 flex min-h-[328px] items-center justify-center rounded-2xl border border-dashed bg-white/10 p-6 md:p-10">
                        <div className="w-full text-center">
                            <div className="mx-auto w-full max-w-[290px] text-center">
                                <h3 className="mb-10 text-4xl font-bold text-white">ADD NEW ITEM</h3>

                                <div className="mx-auto my-5 flex w-full max-w-[210px] items-center justify-center">
                                    <div className="block h-px w-full bg-white/10"></div>

                                    <div className="block h-px w-full bg-white/10"></div>
                                </div>
                                <div className="max-w-sm px-6 sm:px-0">
                                    <form onSubmit={addNewItem} className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Name</p>
                                            <input
                                                type="text"
                                                value={carName}
                                                onChange={(e) => setCarName(e.target.value)}
                                                className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Brand</p>
                                            <input
                                                type="text"
                                                value={carBrand}
                                                onChange={(e) => setCarBrand(e.target.value)}
                                                className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Image Url</p>
                                            <input
                                                type="text"
                                                value={carImageUrl}
                                                onChange={(e) => setCarImageUrl(e.target.value)}
                                                className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Price</p>
                                            <input
                                                type="number"
                                                value={carPrice}
                                                onChange={(e) => setCarPrice(Number(e.target.value))}
                                                className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Description</p>
                                            <input
                                                type="textarea"
                                                value={carDescription}
                                                onChange={(e) => setCarDescription(e.target.value)}
                                                className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-left text-gray-400">Car Status</p>
                                            <div className="flex items-center gap-4">
                                                <div >
                                                    <input
                                                        type="radio"
                                                        name="carStatus"
                                                        value={carStatus}
                                                        onChange={(e) => setCarStatus(e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    <label className="text-white mr-4">
                                                        Available
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="carStatus"
                                                        value={carStatus}
                                                        onChange={(e) => setCarStatus(e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    <label className="text-white">
                                                        Not Available
                                                    </label>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <button
                                            type="submit"
                                            className="rounded-md cursor-pointer bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
                                        >
                                            Add Item
                                        </button>
                                    </form>
                                    {message == "Item added successfully!" ? (
                                        <div className="mt-4 text-sm text-green-500">{message}</div>
                                    ) : (
                                        <div className="mt-4 text-sm text-red-500">{message}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddItem;