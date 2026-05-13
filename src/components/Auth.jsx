import React, { useState } from 'react';

const Auth = ({ setPage, setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        const url = isLogin
            ? 'https://ecommerce-backend-design-seven.vercel.app/api/auth/login'
            : 'https://ecommerce-backend-design-seven.vercel.app/api/auth/signup';

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong');
            } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setPage('home');
            }
        } catch (err) {
            setError('Server error, try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                {/* Logo */}
                <h2 className="text-2xl font-bold text-[#1C1C1C] mb-1">
                    {isLogin ? 'Sign in to your account' : 'Create an account'}
                </h2>
                <p className="text-[#8B96A5] text-sm mb-6">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </span>
                </p>

                {/* Error */}
                {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

                {/* Name field (signup only) */}
                {!isLogin && (
                    <div className="mb-4">
                        <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Full name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Sign up'}
                </button>
            </div>
        </div>
    );
};

export default Auth;