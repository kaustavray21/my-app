import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";


import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";

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

export default function FeaturedDestinationSection() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch("http://localhost:3000/destinations");
                if (response.ok) {
                    const data = await response.json();
                    setDestinations(data);
                } else {
                    console.error("Failed to fetch destinations");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-teal-600 text-xl font-bold">
                        Loading amazing places...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                        Discover Jharkhand
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Must-Visit Destinations
                    </h2>
                </div>

                {/* FIX: Added Mask Image styles here.
                    This creates a fade effect on the left and right edges,
                    hiding cards that are too far away and making exactly ~5 visible.
                */}
                <div
                    className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        spaceBetween={0}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        mousewheel={{
                            thresholdDelta: 50,
                            forceToAxis: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Mousewheel]}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 'auto', spaceBetween: 20 },
                            1024: { slidesPerView: 'auto', spaceBetween: 0 },
                        }}
                        // Removed loopedSlides prop to fix TS Error
                        className="w-full !overflow-visible pt-12 pb-20 px-4"
                        style={{
                            paddingBottom: '60px'
                        }}
                    >
                        {destinations.map((dest) => (
                            <SwiperSlide
                                key={dest._id}
                                className="transition-all duration-500 !w-[320px]"
                            >
                                {/* Corrected Color: #f3fad7 */}
                                <div className="relative flex flex-col rounded-xl bg-[#f3fad7] shadow-lg h-[430px] w-full">

                                    <div className="relative mx-4 -mt-10 h-56 overflow-hidden rounded-xl shadow-lg shadow-teal-500/40">
                                        <img
                                            src={dest.image}
                                            alt={dest.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
                                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold border border-white/30">
                                            {dest.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-xl font-bold text-teal-900">
                                                {dest.title}
                                            </h5>
                                            <span className="text-sm font-semibold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                                                ★ {dest.rating}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {dest.description}
                                        </p>
                                    </div>

                                    <div className="px-6 pb-6 mt-auto">
                                        <Link
                                            to="#"
                                            className="block w-full rounded-lg bg-teal-600 py-3 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg hover:shadow-teal-500/40 hover:scale-105 transition"
                                        >
                                            Explore Location
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}