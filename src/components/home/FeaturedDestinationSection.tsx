import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Destination {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: string;
    price: string;
}

const destinations: Destination[] = [
    {
        id: 1,
        title: "Bali, Indonesia",
        description: "Experience the tropical paradise with pristine beaches and vibrant culture.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
        rating: 4.9,
        reviewCount: "2,400",
        price: "$899"
    },
    {
        id: 2,
        title: "Kyoto, Japan",
        description: "Immerse yourself in history with ancient temples and cherry blossoms.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
        rating: 4.8,
        reviewCount: "1,850",
        price: "$1,200"
    },
    {
        id: 3,
        title: "Santorini, Greece",
        description: "Enjoy stunning sunsets and white-washed architecture by the sea.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=600&auto=format&fit=crop",
        rating: 5.0,
        reviewCount: "3,100",
        price: "$1,500"
    }
];

const StarIcon = ({ filled, half }: { filled?: boolean; half?: boolean }) => {
    if (half) {
        return (
            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <defs>
                    <linearGradient id="half-grad">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="#e5e7eb" />
                    </linearGradient>
                </defs>
                <path fill="url(#half-grad)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        );
    }
    return (
        <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
    );
};

export default function FeaturedDestinationSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
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
    }, []);

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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 section-title">
                    Top Trending Destinations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="group">
                            <Link to="#" className="block h-full no-underline">
                                <div className="
                                    bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col
                                    transition-all duration-300 ease-in-out border border-transparent
                                    group-hover:-translate-y-2 group-hover:shadow-lg
                                ">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={dest.image}
                                            alt={dest.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-teal-700 shadow-sm">
                                            {dest.price}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h5 className="
                                            text-xl font-bold text-gray-900 mb-2
                                            transition-colors duration-200
                                            group-hover:text-teal-600
                                        ">
                                            {dest.title}
                                        </h5>
                                        <p className="text-gray-500 mb-4 flex-grow">
                                            {dest.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center">
                                                <div className="flex space-x-1">
                                                    <StarIcon filled />
                                                    <StarIcon filled />
                                                    <StarIcon filled />
                                                    <StarIcon filled />
                                                    <StarIcon filled={dest.rating === 5} half={dest.rating < 5} />
                                                </div>
                                                <span className="ml-2 text-sm text-gray-400">({dest.reviewCount})</span>
                                            </div>
                                            <span className="text-sm font-semibold text-teal-600">7 Days</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}