import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface GuideProfile {
    username: string;
    email: string;
    name?: string;
    mobile?: string;
}

export default function GuideDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [guide, setGuide] = useState<GuideProfile | null>(null);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                handleLogout();
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setGuide(data);
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                handleLogout();
            }
        };

        fetchProfile();
    }, []);

    if (!guide) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Congratulations Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100 mb-8 transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-700 px-8 py-10 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mx-auto bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold font-serif mb-2">Congratulations!</h1>
                            <p className="text-teal-50 text-lg">You are now an official guide with Tour-Planner.</p>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                <p className="text-lg font-semibold text-gray-800">{guide.name || guide.username}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                <p className="text-lg font-semibold text-gray-800">{guide.email}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                                <p className="text-lg font-semibold text-gray-800">{guide.mobile || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Verified & Active
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}