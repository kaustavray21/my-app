import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: string;
    color: string; // For the placeholder image text background
}

const courses: Course[] = [
    {
        id: 1,
        title: "Python for Beginners",
        description: "A comprehensive introduction to the Python programming language.",
        image: "https://placehold.co/600x400/000000/FFFFFF?text=Python",
        rating: 4.8,
        reviewCount: "1,250",
        color: "text-black"
    },
    {
        id: 2,
        title: "Django Web Development",
        description: "Build powerful web applications with the Django framework.",
        image: "https://placehold.co/600x400/228B22/FFFFFF?text=Django",
        rating: 4.9,
        reviewCount: "980",
        color: "text-green-700"
    },
    {
        id: 3,
        title: "Modern Frontend with React",
        description: "Create interactive user interfaces with the React.js library.",
        image: "https://placehold.co/600x400/6f42c1/FFFFFF?text=React",
        rating: 4.7,
        reviewCount: "1,500",
        color: "text-purple-600"
    }
];

// Helper component for Star Icons
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

export default function FeaturedCoursesSection() {
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
                    Explore Our Popular Courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="group">
                            {/* We use a div here instead of Link since the route might not exist yet,
                                but in a real app this would point to specific course pages */}
                            <Link to="#" className="block h-full no-underline">
                                <div className="
                                    bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col
                                    transition-all duration-300 ease-in-out border border-transparent
                                    group-hover:-translate-y-2 group-hover:shadow-[0_1rem_1.5rem_rgba(0,0,0,0.1)]
                                ">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h5 className="
                                            text-xl font-bold text-gray-900 mb-2
                                            transition-colors duration-200
                                            group-hover:text-[#663F83]
                                        ">
                                            {course.title}
                                        </h5>
                                        <p className="text-gray-500 mb-4 flex-grow">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center mt-auto">
                                            <div className="flex space-x-1">
                                                {[...Array(4)].map((_, i) => (
                                                    <StarIcon key={i} filled />
                                                ))}
                                                <StarIcon key={4} filled={course.rating === 5} half={course.rating < 5} />
                                            </div>
                                            <span className="ml-2 font-bold text-yellow-500">{course.rating}</span>
                                            <span className="ml-2 text-sm text-gray-400">({course.reviewCount} ratings)</span>
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