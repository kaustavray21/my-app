import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Destination {
    _id: string;
    title: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: string;
    category: string;
}

const StarIcon = ({ filled }: { filled?: boolean; half?: boolean }) => {
    return (
        <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
    );
};

export default function FeaturedDestinationSection() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    // New state to control how many items to show
    const [showAll, setShowAll] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('http://localhost:3000/destinations');
                if (response.ok) {
                    const data = await response.json();
                    setDestinations(data);
                } else {
                    console.error('Failed to fetch destinations');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [loading]);

    // Determine which destinations to display based on showAll state
    const displayedDestinations = showAll ? destinations : destinations.slice(0, 3);

    if (loading) {
        return (
            <section className="py-24 bg-gray-50 flex justify-center items-center">
                <p className="text-teal-600 text-xl font-bold">Loading amazing places...</p>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className={`
                py-24 bg-gray-50
                transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section with Button at Top Right */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-left max-w-2xl mb-6 md:mb-0">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Discover Jharkhand
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 section-title">
                            Must-Visit Destinations
                        </h2>
                        <p className="text-gray-500 mt-4 text-lg">
                            From sacred temples to roaring waterfalls, explore the hidden gems of nature's own abode.
                        </p>
                    </div>

                    {/* Toggle Button Moved Here */}
                    {destinations.length > 3 && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                        >
                            {showAll ? "Show Less" : "View All Destinations"}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDestinations.map((dest) => (
                        <div key={dest._id} className="group relative">
                            <Link to="#" className="block h-full no-underline">
                                <div className="
                                    bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col
                                    transition-all duration-300 ease-in-out border border-gray-100
                                    group-hover:-translate-y-2 group-hover:shadow-xl
                                ">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={dest.image}
                                            alt={dest.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20">
                                            {dest.category}
                                        </div>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow relative">
                                        <div className="mb-2">
                                            <h5 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                {dest.title}
                                            </h5>
                                            <p className="text-sm text-teal-600 font-medium flex items-center gap-1 mt-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {dest.location}
                                            </p>
                                        </div>

                                        <p className="text-gray-500 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                                            {dest.description}
                                        </p>

                                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-yellow-400">
                                                    <StarIcon filled />
                                                    <span className="ml-1 text-gray-900 font-bold text-sm">{dest.rating}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">({dest.reviewCount})</span>
                                            </div>
                                            <span className="text-sm font-semibold text-teal-600 group-hover:underline">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom button removed */}
            </div>
        </section>
    );
}