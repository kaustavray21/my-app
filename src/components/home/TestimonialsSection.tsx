import { useEffect, useRef, useState } from 'react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah L.",
        role: "Web Developer",
        quote: "The Python course was fantastic! The instructor explained complex topics in a simple way. I feel much more confident in my coding skills now.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "David C.",
        role: "CS Student",
        quote: "I enrolled in the Django course to build a project for my portfolio, and it exceeded my expectations. Highly recommended for anyone serious about web development.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Maria G.",
        role: "Career Changer",
        quote: "As a complete beginner, I found the platform very easy to navigate. The self-paced learning model is perfect for my busy schedule.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    }
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Scroll animation observer
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
            id="reviews"
            className={`
                py-24 bg-gray-100
                transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 section-title">
                    What Our Students Say
                </h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Carousel Wrapper */}
                    <div className="overflow-hidden relative min-h-[400px] md:min-h-[350px]">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`
                                    absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
                                    flex flex-col items-center justify-center text-center px-4
                                    ${index === activeIndex
                                    ? 'opacity-100 translate-x-0'
                                    : index < activeIndex
                                        ? 'opacity-0 -translate-x-full'
                                        : 'opacity-0 translate-x-full'
                                }
                                `}
                            >
                                <div className="bg-white p-10 rounded-2xl shadow-sm max-w-2xl w-full">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-20 h-20 rounded-full object-cover mx-auto mb-6 shadow-md"
                                    />
                                    <p className="text-xl text-gray-600 italic mb-8 font-light">
                                        "{testimonial.quote}"
                                    </p>
                                    <div>
                                        <h5 className="text-xl font-bold text-gray-900">{testimonial.name}</h5>
                                        <p className="text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center space-x-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${index === activeIndex ? 'bg-[#663F83] w-8' : 'bg-gray-300 hover:bg-gray-400'}
                                `}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}