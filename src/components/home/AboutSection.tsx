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
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 section-title">
                        About InCuiseNix Travels
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        We believe that travel is the only thing you buy that makes you richer. Our team of dedicated explorers is committed to curating the most authentic and immersive travel experiences for you, ensuring every journey creates memories that last a lifetime.
                    </p>
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Meet Our Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
                                alt="John Doe"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">John Doe</h5>
                                <p className="text-gray-200 text-sm">Senior Expedition Leader</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
                                alt="Jane Smith"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">Jane Smith</h5>
                                <p className="text-gray-200 text-sm">Cultural Liaison</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden h-96 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
                                alt="Peter Jones"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <h5 className="text-xl font-bold drop-shadow-md">Peter Jones</h5>
                                <p className="text-gray-200 text-sm">Adventure Specialist</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}