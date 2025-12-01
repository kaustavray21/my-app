import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    // Handle scroll effect for sticky navbar transparency/shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to handle hash navigation
    const handleNavClick = (hash: string) => {
        setIsMobileMenuOpen(false); // Close mobile menu on click
        if (location.pathname === '/') {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${hash}`);
        }
    };

    // Reusable Tailwind classes for navigation links - Changed hover to Teal
    const navLinkStyles = "text-[#495057] font-medium px-4 py-2 rounded-md transition-colors duration-200 hover:text-[#0d9488] hover:bg-[#f0fdfa]";

    // New Gradient Sign Up Button Styles (Teal/Ocean Theme)
    const signUpButtonStyles = `
        flex justify-center items-center gap-2 w-32 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold 
        bg-gradient-to-r from-[#2dd4bf] via-[#0d9488] to-[#115e59] 
        hover:shadow-xl hover:shadow-teal-500 hover:scale-105 duration-300 
        hover:from-[#115e59] hover:to-[#2dd4bf] no-underline ml-2
    `;

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans
                ${isScrolled ? 'bg-[#f1f0f1]/95 shadow-sm py-2' : 'bg-[#f1f0f1] py-3'}
                border-b border-gray-200
            `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo - Updated highlight color */}
                    <Link to="/" className="text-2xl font-serif font-bold text-[#212529] no-underline">
                        Tour-<span className="text-[#0d9488]">Planner</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <button onClick={() => handleNavClick('about')} className={navLinkStyles}>About</button>
                        <button onClick={() => handleNavClick('status')} className={navLinkStyles}>Features</button>
                        <button onClick={() => handleNavClick('faq')} className={navLinkStyles}>FAQ</button>
                        <button onClick={() => handleNavClick('reviews')} className={navLinkStyles}>Reviews</button>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="bg-[#0d9488] text-white px-4 py-2 rounded-[5px] hover:bg-[#0f766e] transition-colors duration-200 font-medium no-underline"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-[5px] hover:bg-gray-50 transition-colors duration-200 font-medium cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-[#495057] font-medium px-4 py-2 rounded-[0.375rem] hover:bg-[#f1f3f5] transition-colors duration-200 no-underline"
                                >
                                    Log In
                                </Link>
                                <Link to="/signup" className={signUpButtonStyles}>
                                    Sign Up
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <div className="flex flex-col space-y-2 pb-4">
                        <button onClick={() => handleNavClick('about')} className={`${navLinkStyles} text-left`}>About</button>
                        <button onClick={() => handleNavClick('status')} className={`${navLinkStyles} text-left`}>Features</button>
                        <button onClick={() => handleNavClick('faq')} className={`${navLinkStyles} text-left`}>FAQ</button>
                        <button onClick={() => handleNavClick('reviews')} className={`${navLinkStyles} text-left`}>Reviews</button>

                        <div className="border-t border-gray-200 pt-3 mt-2 flex flex-col space-y-3">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="bg-[#0d9488] text-white px-4 py-2 rounded text-center no-underline">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded text-center">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-[#495057] font-medium px-4 py-2 hover:bg-[#f1f3f5] rounded text-center no-underline">
                                        Log In
                                    </Link>
                                    <div className="flex justify-center">
                                        <Link to="/signup" className={signUpButtonStyles}>
                                            Sign Up
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}