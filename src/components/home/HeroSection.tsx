import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeroSection() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="bg-gray-50 py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Text Container with Slide In Animation */}
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 animate-[slideInLeft_0.8s_ease-out]">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Unlock Your Potential
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-500 mt-4 md:w-10/12">
                            Join a community of learners and take your skills to the next level with our expert-led courses.
                        </p>

                        <div className="mt-8">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="inline-block no-underline">
                                    <button className="
                                        bg-[#663F83] text-white
                                        font-bold text-xl px-6 py-2 rounded-lg
                                        transform perspective-[500px] [transform:rotateY(-20deg)]
                                        shadow-[calc(-1*0.08em)_0.01em_2px_rgba(0,0,0,0.25)]
                                        transition-all duration-300
                                        hover:[transform:rotateY(0deg)] hover:shadow-xl
                                        cursor-pointer
                                    ">
                                        Go to Dashboard
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/signup" className="inline-block no-underline">
                                    <button className="
                                        bg-[#663F83] text-white
                                        font-bold text-xl px-6 py-2 rounded-lg
                                        transform perspective-[500px] [transform:rotateY(-20deg)]
                                        shadow-[calc(-1*0.08em)_0.01em_2px_rgba(0,0,0,0.25)]
                                        transition-all duration-300
                                        hover:[transform:rotateY(0deg)] hover:shadow-xl
                                        cursor-pointer
                                    ">
                                        Get Started Now
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Image Container with Fade In Animation and 3D Effect */}
                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative perspective-[1500px] animate-[fadeInRight_0.8s_ease-out]">
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto-format&fit=crop"
                            alt="Developer coding on a laptop"
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

            {/* Internal styles for specific keyframes to avoid external CSS */}
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