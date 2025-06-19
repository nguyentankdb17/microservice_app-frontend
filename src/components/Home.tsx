import React from "react";
import type { Car } from "../type/types";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const CAR_SERVICE_API_URL = `${import.meta.env.VITE_CAR_SERVICE}/api/cars`;
    const USER_SERVICE_API_URL = `${import.meta.env.VITE_USER_SERVICE}/api/user`;
    const [cars, setCars] = React.useState<Car[]>([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Check if the user is an admin
        const checkLogin = async () => {
            if (!token) {
                console.error("Please log in to view our products.");
                return;
            }
            try {
                const response = await fetch(`${USER_SERVICE_API_URL}/user-info`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("You are not logged in");
                }

                setIsLoggedIn(true);

                const data = await response.json();
                if (data.is_admin === true) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Failed to check login status:", error);
            }
        };

        checkLogin();
    }, [USER_SERVICE_API_URL, token]);

    React.useEffect(() => {
        // Fetch car data from the API
        const fetchCars = async () => {
            if (!token) {
                console.error("Please log in to view our products.");
                return;
            }
            try {
                const response = await fetch(`${CAR_SERVICE_API_URL}/list`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Car[] = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Failed to fetch car data:", error);
            }
        };

        fetchCars();
    }, [CAR_SERVICE_API_URL, token]);

    const handleDelete = async (carId: number) => {
        try {
            const response = await fetch(`${CAR_SERVICE_API_URL}/delete/${carId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete car");
            }
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleEdit = (car: Car) => {
        navigate("/update-item/", { state: { car } });
    };

    if (!isLoggedIn) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0F172A]">
                <div className="text-center text-white">
                    <h1 className="mb-4 text-4xl font-bold">Please Log In</h1>
                    <p className="mb-6 text-lg">You need to log in to view our products.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col items-center bg-[#0F172A] pt-10">
            <div className="flex flex-col items-center">
                <h6 className="mb-3 flex items-center text-center text-4xl font-bold text-white">OUR PRODUCTS</h6>
                {isAdmin && (
                    <Link
                        to="/add-item"
                        className="my-5 rounded-md bg-green-700 px-7 py-3 text-base font-medium text-white hover:bg-green-900"
                    >
                        Add New Item
                    </Link>
                )}
                <section className="bg-gray-2 dark:bg-dark mt-5">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex cursor-pointer flex-wrap">
                            {cars.map((car) => (
                                <div key={car.id} className="w-full px-4 md:w-1/2 xl:w-1/3">
                                    <div className="shadow-1 hover:shadow-3 mb-10 overflow-hidden rounded-lg bg-[#1B2532] duration-300 hover:scale-110">
                                        <div className="h-52 max-w-md overflow-hidden">
                                            <img
                                                src={car.image_url}
                                                alt="card image"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3>
                                                <span className="hover:text-primary 2xl:text-[22px block text-xl font-semibold text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl">
                                                    {car.name}
                                                </span>
                                            </h3>
                                            <p className="my-3 text-base leading-relaxed text-gray-500">
                                                {car.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between bg-[#1B2532] px-10 pb-6">
                                            <div className="items-center">
                                                {car.is_available ? (
                                                    <span className="rounded-md bg-green-600 px-2 py-1 font-bold text-white">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="rounded-md bg-red-600 px-2 py-1 font-bold text-white">
                                                        Not Available
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="ml-2 text-2xl font-bold text-white">${car.price}</span>
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex flex-col items-center pb-5">
                                                <div className="flex flex-row space-x-5">
                                                    <button
                                                        title="Edit"
                                                        onClick={() => handleEdit(car)}
                                                        className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="1em"
                                                            height="1em"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                                                            ></path>
                                                        </svg>
                                                    </button>

                                                    <button
                                                        className="cursor-pointer rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                                        onClick={() => handleDelete(car.id)}
                                                        title="Delete"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="1em"
                                                            height="1em"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
