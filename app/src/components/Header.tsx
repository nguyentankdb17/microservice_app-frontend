import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { User } from "../type/types";
const Header: React.FC = () => {
    const USER_SERVICE_API_URL = `/api/user`;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) return;

            const res = await fetch(`${USER_SERVICE_API_URL}/user-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                localStorage.removeItem("access_token");
            }
        };

        checkLogin();
    }, [USER_SERVICE_API_URL]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${USER_SERVICE_API_URL}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
        localStorage.removeItem("access_token");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <header className="flex w-full items-center bg-[#0F172A]">
            <div className="container mx-auto">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-60 max-w-full px-4">
                        <Link to="/" className="block w-full py-5">
                            <img src="./logo.png" alt="Logo" className="rounded-2xl" />
                        </Link>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <nav
                                id="navbarCollapse"
                                className={`${
                                    !navbarOpen ? "hidden" : ""
                                } absolute top-full right-4 w-full max-w-[250px] rounded-lg px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent`}
                            >
                                <ul className="block lg:flex">
                                    <li>
                                        <Link
                                            to="/"
                                            className="flex py-2 text-base font-medium text-gray-500 hover:text-white lg:ml-12 lg:inline-flex"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/"
                                            className="flex py-2 text-base font-medium text-gray-500 hover:text-white lg:ml-12 lg:inline-flex"
                                        >
                                            Our Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/"
                                            className="flex py-2 text-base font-medium text-gray-500 hover:text-white lg:ml-12 lg:inline-flex"
                                        >
                                            Our Partners
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-white">
                                    👤 <strong>{user.username}</strong> ({user.is_admin ? "Admin" : "User"})
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer rounded-md bg-red-700 px-3 py-2 text-base font-medium text-white hover:bg-red-900"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="hidden justify-end space-x-3 pr-16 sm:flex lg:pr-0">
                                <Link
                                    to="/login"
                                    className="rounded-md bg-blue-700 px-7 py-3 text-base font-medium text-white hover:bg-blue-900"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="rounded-md bg-blue-700 px-7 py-3 text-base font-medium text-white hover:bg-blue-900"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        <button
                            onClick={() => setNavbarOpen(!navbarOpen)}
                            className={`ring-primary cursor-pointer rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden ${
                                navbarOpen ? "navbarTogglerActive" : ""
                            }`}
                            id="navbarToggler"
                        >
                            <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                            <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                            <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
