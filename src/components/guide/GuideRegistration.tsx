import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LocationData {
    _id: string;
    district: string;
    cities: string[];
}

export default function GuideRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: '',
        aadhaar: '',
        pan: '',
        address: '',
        district: '',
        city: ''
    });

    // State for dynamic locations
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(true);

    // Fetch Locations on Mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:3000/locations');
                if (response.ok) {
                    const data = await response.json();
                    setLocations(data);
                } else {
                    console.error('Failed to fetch locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setIsLoadingLocations(false);
            }
        };

        fetchLocations();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle District Change specifically to update cities
        if (name === 'district') {
            const selectedLocation = locations.find(loc => loc.district === value);
            setAvailableCities(selectedLocation ? selectedLocation.cities : []);
            setFormData(prev => ({
                ...prev,
                district: value,
                city: '' // Reset city when district changes
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:3000/register-guide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful! You will be verified within 24 hrs.");
                setFormData({
                    name: '', email: '', mobile: '', dob: '', aadhaar: '', pan: '', address: '', district: '', city: ''
                });
                setAvailableCities([]);
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-teal-600 px-8 py-6">
                    <h2 className="text-3xl font-bold text-white text-center font-serif">
                        Register as a Guide
                    </h2>
                    <p className="text-teal-100 text-center mt-2">
                        Join our team and share your local expertise with the world.
                    </p>
                </div>

                <div className="p-8">
                    {message ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-lg text-gray-600 mb-8">{message}</p>
                            <Link to="/" className="inline-block bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                        placeholder="10-digit mobile number"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This will be your password for login.</p>
                                </div>

                                {/* Aadhaar */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                                    <input
                                        type="text"
                                        name="aadhaar"
                                        required
                                        value={formData.aadhaar}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                        placeholder="12-digit Aadhaar number"
                                    />
                                </div>

                                {/* PAN */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                                    <input
                                        type="text"
                                        name="pan"
                                        required
                                        value={formData.pan}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                        placeholder="ABCDE1234F"
                                    />
                                </div>

                                {/* District Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                                    <select
                                        name="district"
                                        required
                                        value={formData.district}
                                        onChange={handleChange}
                                        disabled={isLoadingLocations}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white disabled:bg-gray-100"
                                    >
                                        <option value="">
                                            {isLoadingLocations ? 'Loading Districts...' : 'Select District'}
                                        </option>
                                        {locations.map((loc) => (
                                            <option key={loc._id} value={loc.district}>
                                                {loc.district}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <select
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={!formData.district || availableCities.length === 0}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white disabled:bg-gray-100"
                                    >
                                        <option value="">Select City</option>
                                        {availableCities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                                    placeholder="Enter your full residential address"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed mt-8 cursor-pointer"
                            >
                                {isSubmitting ? 'Submitting...' : 'Verify & Register'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}