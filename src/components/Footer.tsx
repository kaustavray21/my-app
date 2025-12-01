import { Link } from 'react-router-dom';

// SVG Icons for the Footer
const Icons = {
    Twitter: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>,
    GitHub: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
    LinkedIn: () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>,
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
                            InCuise<span className="text-[#c0a2e8]">Nix</span>
                        </h3>
                        <p className="text-sm max-w-xs mb-6">
                            Empowering the next generation of developers and creators through accessible, high-quality education.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" aria-label="Twitter" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.Twitter />
                            </a>
                            <a href="#" aria-label="GitHub" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.GitHub />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-[#adb5bd] hover:text-white hover:scale-110 transition-all duration-200">
                                <Icons.LinkedIn />
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
                <p>&copy; 2025 InCuiseNix. All rights reserved.</p>
            </div>
        </footer>
    );
}