import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const role = localStorage.getItem('role');
    const dashboardPath = role === 'admin' ? '/admin' : '/dashboard';

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (hash: string) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${hash}`);
        }
    };

    // LOGIC: Navbar is transparent ONLY if we are on the Home Page AND haven't scrolled down yet.
    const isHomePage = location.pathname === '/';
    const isTransparent = isHomePage && !isScrolled;

    // --- Dynamic Styles based on isTransparent state ---

    // Text Colors
    const navTextClass = isTransparent
        ? "text-white/90 hover:text-white"
        : "text-gray-700 hover:text-[#0d9488]";

    // Logo Colors
    const logoColor = isTransparent ? "text-white" : "text-[#212529]";
    const logoHighlight = isTransparent ? "text-teal-400" : "text-[#0d9488]";

    // Backgrounds - Increased padding here (py-6 and py-4)
    const navBackground = isTransparent
        ? "bg-transparent py-6"
        : "bg-white/95 backdrop-blur-md shadow-sm py-4";

    // Mobile Menu Styles
    const mobileMenuBg = isTransparent ? "bg-black/90 backdrop-blur-md" : "bg-white";
    const mobileMenuText = isTransparent ? "text-white hover:text-teal-400" : "text-gray-700 hover:text-[#0d9488]";
    const mobileMenuButtonColor = isTransparent ? "text-white" : "text-gray-600";

    // Button Styles
    const signUpButtonStyles = `
        flex justify-center items-center gap-2 w-32 h-10 cursor-pointer rounded-md shadow-lg font-semibold 
        transition-all duration-300 no-underline ml-2
        ${!isTransparent
        ? 'bg-gradient-to-r from-[#2dd4bf] via-[#0d9488] to-[#115e59] text-white hover:shadow-teal-500/50'
        : 'bg-white text-teal-800 hover:bg-gray-100'}
    `;

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans
                ${navBackground}
            `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12"> {/* Added explicit height control for content alignment */}

                    {/* Logo */}
                    <Link to="/" className={`text-3xl font-serif font-bold no-underline transition-colors duration-300 ${logoColor}`}>
                        Tour-<span className={logoHighlight}>Planner</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 focus:outline-none ${mobileMenuButtonColor}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <button onClick={() => handleNavClick('about')} className={`font-medium text-lg px-2 py-2 transition-colors duration-200 ${navTextClass}`}>About</button>
                        <button onClick={() => handleNavClick('status')} className={`font-medium text-lg px-2 py-2 transition-colors duration-200 ${navTextClass}`}>Features</button>
                        <button onClick={() => handleNavClick('faq')} className={`font-medium text-lg px-2 py-2 transition-colors duration-200 ${navTextClass}`}>FAQ</button>
                        <button onClick={() => handleNavClick('reviews')} className={`font-medium text-lg px-2 py-2 transition-colors duration-200 ${navTextClass}`}>Reviews</button>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={dashboardPath}
                                    className={`px-6 py-2.5 rounded-[5px] font-medium no-underline transition-colors duration-200 text-lg ${!isTransparent ? 'bg-[#0d9488] text-white hover:bg-[#0f766e]' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`border px-6 py-2.5 rounded-[5px] font-medium cursor-pointer transition-colors duration-200 text-lg ${!isTransparent ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' : 'bg-transparent border-white/50 text-white hover:bg-white/10'}`}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`font-medium px-4 py-2 text-lg rounded-[0.375rem] transition-colors duration-200 no-underline ${navTextClass}`}
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
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-6' : 'max-h-0'}`}>
                    <div className={`${mobileMenuBg} rounded-xl p-6 flex flex-col space-y-4 shadow-xl`}>
                        <button onClick={() => handleNavClick('about')} className={`${mobileMenuText} text-left py-2 text-lg`}>About</button>
                        <button onClick={() => handleNavClick('status')} className={`${mobileMenuText} text-left py-2 text-lg`}>Features</button>
                        <button onClick={() => handleNavClick('faq')} className={`${mobileMenuText} text-left py-2 text-lg`}>FAQ</button>
                        <button onClick={() => handleNavClick('reviews')} className={`${mobileMenuText} text-left py-2 text-lg`}>Reviews</button>

                        <div className="border-t border-gray-200/20 pt-4 mt-2 flex flex-col space-y-4">
                            {isAuthenticated ? (
                                <>
                                    <Link to={dashboardPath} className="bg-teal-600 text-white px-4 py-3 rounded text-center no-underline text-lg">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className={`bg-transparent border text-center px-4 py-3 rounded text-lg ${isTransparent ? 'border-gray-500 text-white' : 'border-gray-300 text-gray-700'}`}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={`text-center py-2 no-underline text-lg ${mobileMenuText}`}>
                                        Log In
                                    </Link>
                                    <div className="flex justify-center">
                                        <Link to="/signup" className="w-full bg-white text-teal-900 font-bold py-3 rounded-md text-center no-underline border border-gray-200 text-lg">
                                            Sign Up
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