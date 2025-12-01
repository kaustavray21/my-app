import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import heroVideo from '../../assets/hero-video.mp4';

export default function HeroSection() {
    const { isAuthenticated } = useAuth();
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Auto-play was prevented:", error);
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <section className="relative w-full h-screen max-w-[100vw] overflow-hidden bg-black">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            </div>

            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="max-w-3xl animate-[slideInUp_1s_ease-out]">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-6 border border-white/30">
                        The Land of Forests
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                        Experience the Soul of <br />
                        <span className="text-teal-400">Jharkhand</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-light max-w-2xl drop-shadow-md">
                        Journey through the mesmerizing waterfalls of Ranchi, the dense forests of Saranda, and the sacred peaks of Parasnath.
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="inline-block no-underline">
                                <button className="
                                    bg-teal-600 text-white
                                    font-bold text-lg px-8 py-3 rounded-full
                                    transition-all duration-300
                                    hover:bg-teal-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,148,136,0.5)]
                                    cursor-pointer border border-teal-500
                                ">
                                    Explore Packages
                                </button>
                            </Link>
                        ) : (
                            <Link to="/signup" className="inline-block no-underline">
                                <button className="
                                    bg-white text-teal-900
                                    font-bold text-lg px-8 py-3 rounded-full
                                    transition-all duration-300
                                    hover:bg-gray-100 hover:scale-105 hover:shadow-lg
                                    cursor-pointer
                                ">
                                    Start Journey
                                </button>
                            </Link>
                        )}

                        <div className="flex gap-4 ml-4 pointer-events-auto">
                            <button
                                onClick={togglePlay}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 cursor-pointer"
                                aria-label={isPlaying ? "Pause Video" : "Play Video"}
                            >
                                {isPlaying ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={toggleMute}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 cursor-pointer"
                                aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                            >
                                {isMuted ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </section>
    );
}