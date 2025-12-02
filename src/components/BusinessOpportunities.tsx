import { Link } from 'react-router-dom';

export default function BusinessOpportunities() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                        Business Opportunities
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Partner with Tour-Planner to unlock new growth avenues. We connect travel agencies, corporate partners, and local guides to create unforgettable experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Local Businesses</h3>
                        <p className="text-gray-600 mb-8">
                            Partner with us to feature your unique local shop, restaurant, or service to travelers seeking authentic experiences.
                        </p>
                        <div className="mt-auto flex justify-end">
                            <Link to="/signup" className="bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                                Become a Partner
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Hotels</h3>
                        <p className="text-gray-600 mb-8">
                            List your property with us to reach a wider audience, increase bookings, and welcome guests from around the world.
                        </p>
                        <div className="mt-auto flex justify-end">
                            <Link to="/signup" className="bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                                Register your Hotel
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Guides</h3>
                        <p className="text-gray-600 mb-8">
                            Join our network of expert guides. Share your local knowledge, lead tours, and earn by doing what you love.
                        </p>
                        <div className="mt-auto flex justify-end">
                            <Link to="/signup" className="bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                                Register as Guide
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}