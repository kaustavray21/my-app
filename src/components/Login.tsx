import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                login();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
            {/* Form Container with Hover Lift Effect */}
            <div className="
                w-[350px] bg-white rounded-[10px] box-border p-[20px_30px] mx-auto
                shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                transition-all duration-300 ease-in-out
                hover:-translate-y-[5px] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]
            ">
                <h2 className="text-center text-[28px] font-[800] text-gray-900 my-[10px] mb-[30px] font-sans">
                    Welcome Back
                </h2>

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-2 text-center text-xs text-red-700 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] mb-[15px]">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full rounded-[20px] border border-[#c0c0c0]
                                px-[15px] py-[12px] outline-none text-gray-700 text-sm
                                focus:border-[#663F83] transition-colors
                            "
                            required
                        />
                    </div>

                    {/* Password Input with Visibility Toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full rounded-[20px] border border-[#c0c0c0]
                                px-[15px] py-[12px] pr-10 outline-none text-gray-700 text-sm
                                focus:border-[#663F83] transition-colors
                            "
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#663F83] focus:outline-none"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full py-[10px] px-[15px] rounded-[20px]
                            bg-[#663F83] text-white font-[sans-serif]
                            shadow-[0_3px_8px_rgba(0,0,0,0.24)] cursor-pointer
                            hover:bg-[#5a3675] active:shadow-none active:translate-y-[1px]
                            transition-all duration-200
                        "
                    >
                        Log in
                    </button>
                </form>

                <p className="m-0 text-center text-[10px] text-[#747474] font-sans">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="
                            ml-1 text-[11px] text-[#663F83] font-[800] underline
                            decoration-[#663F83] hover:text-[#4d2f63]
                        "
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}