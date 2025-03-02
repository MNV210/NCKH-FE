import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Categories } from '../api/CetegoryApi';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, UserCircle } from 'lucide-react'; // Correct import
import { useForm } from 'react-hook-form';
import { UserApi } from '../api/UserApi';
import { message } from 'antd';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    // Setup React Hook Form for login
    const { 
        register: registerLogin, 
        handleSubmit: handleLoginSubmit, 
        formState: { errors: loginErrors }, 
        reset: resetLoginForm 
    } = useForm();
    
    // Setup React Hook Form for signup
    const { 
        register: registerSignUp, 
        handleSubmit: handleSignUpSubmit, 
        formState: { errors: signUpErrors }, 
        reset: resetSignUpForm,
        watch: watchSignUp
    } = useForm();
    
    // For password confirmation validation
    const password = watchSignUp ? watchSignUp("password") : "";

    useEffect(() => {
        const fetchResults = debounce(async (term) => {
            if (term) {
                // Call API to get search results
                const response = await Categories.getCategoriesWithName(term);
                setSearchResults(response);
            } else {
                setSearchResults([]);
            }
        }, 300);
        
        fetchResults(searchTerm);
        
        return () => {
            fetchResults.cancel();
        };
    }, [searchTerm]);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setIsLoggedIn(true);
        }
    }, []);
    
    const handleLinkClick = (id) => {
        navigate(`/category/${id}`);
        window.location.reload();
    };
    
    const onLoginSubmit = async (data) => {
        console.log('Login data:', data);
        // Handle login logic here
        const response = await UserApi.Login(data).then((res) => {
            if(res.status === 200) {
                message.success('Login successful');
                sessionStorage.setItem('user', JSON.stringify(res.data));
                setIsLoggedIn(true);
            } else {
                message.error('Login failed');
            }
        });
        setIsModalOpen(false);
        resetLoginForm();
    };
    
    const onSignUpSubmit = async(data) => {
        console.log('Sign up data:', data);
        const response = await UserApi.CreateUser(data).then((res) => {
            if(res.status === 200) {
                message.success('Register successful');
            } else {
                message.error('Register failed');
            }
        });
        // Handle sign up logic here
        setIsModalOpen(false);
        resetSignUpForm();
    };
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        resetLoginForm();
        resetSignUpForm();
    };

    return (
        <header className="h-24 bg-blue-600 flex items-center justify-between px-6 shadow-lg">
            <h3 className="text-white font-bold">DoBroRus</h3>
            
            <div className="relative w-2/3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-12 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
                        <ul>
                            {searchResults.map(result => (
                                <li
                                    key={result.id}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-0"
                                    onClick={() => handleLinkClick(result.id)}
                                >
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <div className="flex gap-3">
                {isLoggedIn ? (
                    <UserCircle size={32} className="text-white" />
                ) : (
                    <button 
                        onClick={openModal}
                        className="bg-white text-blue-600 px-4 py-2 h-12 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        Account
                    </button>
                )}
            </div>
            
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{isSignUp ? "Create Account" : "Login"}</h2>
                            <button 
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {isSignUp ? (
                            <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <Mail size={18} /> {/* Correct icon */}
                                        </div>
                                        <input
                                            {...registerSignUp("email", { 
                                                required: "Email is required", 
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="email"
                                            placeholder="Email"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {signUpErrors.email && (
                                        <p className="mt-1 text-red-500 text-sm">{signUpErrors.email.message}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <Lock size={18} /> {/* Correct icon */}
                                        </div>
                                        <input
                                            {...registerSignUp("password", { 
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 8 characters"
                                                },
                                                // pattern: {
                                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                //     message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                                                // }
                                            })}
                                            type="password"
                                            placeholder="Password"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {signUpErrors.password && (
                                        <p className="mt-1 text-red-500 text-sm">{signUpErrors.password.message}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <Lock size={18} /> {/* Correct icon */}
                                        </div>
                                        <input
                                            {...registerSignUp("confirmPassword", { 
                                                required: "Please confirm your password",
                                                validate: value => value === password || "Passwords do not match"
                                            })}
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {signUpErrors.confirmPassword && (
                                        <p className="mt-1 text-red-500 text-sm">{signUpErrors.confirmPassword.message}</p>
                                    )}
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    Create Account
                                </button>
                                
                                <div className="text-center mt-4">
                                    <p className="text-gray-600">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setIsSignUp(false)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Login
                                        </button>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <Mail size={18} /> {/* Correct icon */}
                                        </div>
                                        <input
                                            {...registerLogin("email", { 
                                                required: "Email is required", 
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="email"
                                            placeholder="Email"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {loginErrors.email && (
                                        <p className="mt-1 text-red-500 text-sm">{loginErrors.email.message}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <Lock size={18} /> {/* Correct icon */}
                                        </div>
                                        <input
                                            {...registerLogin("password", { 
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            })}
                                            type="password"
                                            placeholder="Password"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {loginErrors.password && (
                                        <p className="mt-1 text-red-500 text-sm">{loginErrors.password.message}</p>
                                    )}
                                </div>
                                
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            {...registerLogin("rememberMe")}
                                            type="checkbox"
                                            id="rememberMe"
                                            className="h-4 w-4 text-blue-600 rounded"
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="text-blue-600 hover:underline text-sm">
                                        Forgot password?
                                    </a>
                                </div> */}
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    Login
                                </button>
                                
                                <div className="text-center mt-4">
                                    <p className="text-gray-600">
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setIsSignUp(true)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Sign up
                                        </button>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;