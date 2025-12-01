import { useEffect, useRef, useState } from 'react';

export default function StatusSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
        <div
            ref={sectionRef}
            id="status"
            className={`
                container mx-auto px-4 py-24 
                transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
                Why Travel With Us?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-teal-600 mb-4">50+</h3>
                    <p className="text-xl text-gray-500 font-medium">Global Destinations</p>
                </div>

                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-teal-600 mb-4">10k+</h3>
                    <p className="text-xl text-gray-500 font-medium">Happy Travelers</p>
                </div>

                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-teal-600 mb-4">24/7</h3>
                    <p className="text-xl text-gray-500 font-medium">Travel Support</p>
                </div>
            </div>
        </div>
    );
}