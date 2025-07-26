import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/user/register', {
                fullName,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Signup error:", error);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-gray-800'>Create an Account</h1>
                    <p className='text-gray-500'>to continue to Gmail Clone</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='John Doe'
                            required
                        />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Email Address</label>                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='johndoe@example.com'
                            required
                        />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='********'
                            required
                        />
                    </div>
                    <div>
                        <button type='submit' className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='text-center text-sm text-gray-600'>
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className='font-medium text-blue-600 hover:underline'>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
