import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Api/apis';

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newErrors: { [key: string]: string } = {};
            if (username.length < 3) {
                newErrors.username = "Name must contain at least 3 letters";
                toast.error(newErrors.username);
            }
            if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
                toast.error(newErrors.email);
            }
            if (!passwordRegex.test(password)) {
                newErrors.password = "Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.";
                toast.error(newErrors.password);
            }
            if (password !== passwordConfirm) {
                newErrors.passwordConfirm = "Passwords do not match";
                toast.error(newErrors.passwordConfirm);
            }
            if (!phoneNumberRegex.test(phone)) {
                newErrors.phone = "Enter a valid phone number!";
                toast.error(newErrors.phone);
            }
            if (Object.keys(newErrors).length === 0) {
                let phoned = parseInt(phone);
                const responseData = await signup(username, email, password, phoned);
                if (responseData?.data.success) {
                    toast.success('Registration successful!');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="absolute top-6">
                <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Camp&Crew
                </span>
            </div>

            <div className="bg-white bg-opacity-60 rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-gray-900 to-stone-400 hover:from-gray-800 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Already have an account? 
                        <button
                            onClick={handleLoginClick}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Signup;
