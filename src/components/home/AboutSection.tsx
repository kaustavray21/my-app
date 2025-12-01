import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
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
            id="about"
            className={`
                container mx-auto px-4 py-24 
                transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            <div className="grid grid-cols-1 gap-12">
                {/* Text Content */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 section-title">
                        About InCuiseNix
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        We are a passionate team dedicated to making high-quality education accessible to everyone, everywhere. Our mission is to empower learners around the globe by providing an intuitive, engaging, and effective online learning platform.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Meet the Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Team Member 1 */}
                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
                                alt="John Doe"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">John Doe</h5>
                                <p className="text-gray-200 text-sm">Founder & CEO</p>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                                alt="Jane Smith"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">Jane Smith</h5>
                                <p className="text-gray-200 text-sm">Lead Instructor</p>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop"
                                alt="Peter Jones"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">Peter Jones</h5>
                                <p className="text-gray-200 text-sm">Head of Development</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}