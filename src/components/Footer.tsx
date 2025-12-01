import { Link } from 'react-router-dom';

// SVG Icons for the Footer
const Icons = {
    Twitter: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>,
    Instagram: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" /></svg>,
    Facebook: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    YouTube: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>,
    Envelope: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Phone: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    MapMarker: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
};

export default function Footer() {
    // This function handles scrolling to hash links if on the home page
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If we are not on the homepage, redirect to home with hash (basic implementation)
            window.location.href = `/#${id}`;
        }
    };

    return (
        <footer className="bg-[#212529] text-[#adb5bd] pt-16 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-5">
                        <h3 className="font-serif text-3xl font-bold text-white mb-4">
                            Tour-<span className="text-[#2dd4bf]">Planner</span>
                        </h3>
                        <p className="text-sm max-w-xs mb-6">
                            Creating unforgettable travel experiences tailored to your dreams. Explore the world with confidence and style.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" aria-label="Twitter" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.Twitter />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.Instagram />
                            </a>
                            <a href="#" aria-label="Facebook" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.Facebook />
                            </a>
                            <a href="#" aria-label="YouTube" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.YouTube />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-3 col-span-6">
                        <h5 className="font-bold text-white uppercase tracking-wider mb-6 text-lg">Navigate</h5>
                        <ul className="space-y-3">
                            <li>
                                <button onClick={() => scrollToSection('about')} className="hover:text-white hover:pl-1 transition-all duration-200">
                                    About
                                </button>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white hover:pl-1 transition-all duration-200">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('faq')} className="hover:text-white hover:pl-1 transition-all duration-200">
                                    FAQ
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 col-span-6">
                        <h5 className="font-bold text-white uppercase tracking-wider mb-6 text-lg">Contact Us</h5>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="mr-3"><Icons.Envelope /></span>
                                kaustav.raysinha@gmail.com
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3"><Icons.Phone /></span>
                                7455983720
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1"><Icons.MapMarker /></span>
                                6th floor, Prime Co towers, Arekere Bannerghatta Road
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-[#1c1f23] py-6 text-center text-sm">
                <p>&copy; 2025 Tour-Planner. All rights reserved.</p>
            </div>
        </footer>
    );
}