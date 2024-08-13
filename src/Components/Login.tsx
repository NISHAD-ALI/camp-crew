import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/apis';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleSignupButton = () => {
        navigate('/signUp');
    };
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!emailPattern.test(email)) {
                const message = "Enter a valid email!";
                setError(message);
                toast.error(message);
                return;
            } else if (password.trim().length < 5) {
                const message = "Password must contain at least 5 characters!";
                setError(message);
                toast.error(message);
                return;
            }

            const response = await login(email, password);
            if (response && response.data && response.data.success) {
                // dispatch(setUserData(response.data.token));
                navigate('/');
                toast.success("Login successful!");
            } else {
                const message = response?.data.message;
                setError(message);
            }

        } catch (err: any) {
            const message = err.message || "An error occurred. Please try again.";
            console.error("Error:", err);
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="absolute top-6">
                <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Camp&Crew
                </span>
            </div>

            <div className="bg-white bg-opacity-60 rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input_container">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-gray-900 to-stone-400 hover:from-gray-800 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                       
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center pl-3">
                    <p className="text-sm text-gray-600">First Time? 
                        <button
                            onClick={handleSignupButton}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                           Signup
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
