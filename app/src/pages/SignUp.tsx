import React from "react";
import { useState } from "react";

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string>("");
    const USER_SERVICE_API_URL = `/api/user`;

    // Handle sign up form submission
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new URLSearchParams();
        data.append("username", username);
        data.append("password", password);
        try {
            const response = await fetch(`${USER_SERVICE_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data.toString(),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const result = await response.json();
            localStorage.setItem("access_token", result.access_token);
            setMessage("Login successfully!");
            window.location.href = "/";
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Login failed. Please try again.");
        }
    };

    return (
        <section className="flex h-screen flex-col items-center bg-[#0F172A] py-15">
            <div className="container">
                <div className="relative mx-auto w-full max-w-lg rounded-[20px] bg-white/10 p-4 shadow-lg">
                    <div className="border-dark-6 relative z-10 flex min-h-[328px] items-center justify-center rounded-2xl border border-dashed bg-white/10 p-6 md:p-10">
                        <div className="w-full text-center">
                            <div className="mx-auto w-full max-w-[290px] text-center">
                                <h3 className="mb-10 text-4xl font-bold text-white">SIGN UP</h3>
                                <p className="mx-auto mb-5 text-base text-gray-400">
                                    Continue by filling out the form below to create an account
                                </p>

                                <div className="mx-auto my-5 flex w-full max-w-[210px] items-center justify-center">
                                    <div className="block h-px w-full bg-white/10"></div>

                                    <div className="block h-px w-full bg-white/10"></div>
                                </div>
                                <div className="max-w-sm px-6 sm:px-0">
                                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="cursor-pointer rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
                                        >
                                            Sign Up
                                        </button>
                                    </form>
                                    {message == "Registration successfully!" ? (
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
};

export default SignUp;
