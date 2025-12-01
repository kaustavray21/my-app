import { useEffect, useRef, useState } from 'react';

export default function StatusSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the section comes into view, make it visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Run animation only once
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the component is visible
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
                Why Choose InCuiseNix?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Card 1 */}
                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">10+</h3>
                    <p className="text-xl text-gray-500 font-medium">Expert-Led Courses</p>
                </div>

                {/* Card 2 */}
                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">500+</h3>
                    <p className="text-xl text-gray-500 font-medium">Happy Students</p>
                </div>

                {/* Card 3 */}
                <div className="
                    bg-white p-10 rounded-2xl shadow-sm h-full border border-gray-100
                    transition-all duration-300 ease-in-out
                    hover:[transform:translateY(-10px)] hover:shadow-xl
                ">
                    <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">1000+</h3>
                    <p className="text-xl text-gray-500 font-medium">Hours of Content</p>
                </div>
            </div>
        </div>
    );
}