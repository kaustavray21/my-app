import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeroSection() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="bg-blue-50 py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 animate-[slideInLeft_0.8s_ease-out]">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Discover Your Next <span className="text-teal-600">Adventure</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-500 mt-4 md:w-10/12">
                            Explore breathtaking destinations, curated tours, and unforgettable experiences. The world is waiting for you.
                        </p>

                        <div className="mt-8">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="inline-block no-underline">
                                    <button className="
                                        bg-teal-600 text-white
                                        font-bold text-xl px-6 py-2 rounded-lg
                                        transform perspective-[500px] [transform:rotateY(-20deg)]
                                        shadow-[calc(-1*0.08em)_0.01em_2px_rgba(0,0,0,0.25)]
                                        transition-all duration-300
                                        hover:[transform:rotateY(0deg)] hover:shadow-xl
                                        hover:bg-teal-700
                                        cursor-pointer
                                    ">
                                        View My Bookings
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/signup" className="inline-block no-underline">
                                    <button className="
                                        bg-teal-600 text-white
                                        font-bold text-xl px-6 py-2 rounded-lg
                                        transform perspective-[500px] [transform:rotateY(-20deg)]
                                        shadow-[calc(-1*0.08em)_0.01em_2px_rgba(0,0,0,0.25)]
                                        transition-all duration-300
                                        hover:[transform:rotateY(0deg)] hover:shadow-xl
                                        hover:bg-teal-700
                                        cursor-pointer
                                    ">
                                        Start Your Journey
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative perspective-[1500px] animate-[fadeInRight_0.8s_ease-out]">
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                            alt="Scenic mountain landscape"
                            className="
                                w-full h-auto rounded-2xl shadow-2xl object-cover
                                transform [transform:rotateY(-15deg)_rotateX(5deg)]
                                transition-transform duration-500 ease-in-out
                                hover:[transform:rotateY(0)_rotateX(0)]
                            "
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInLeft {
                    from { transform: translateX(-50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeInRight {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </section>
    );
}