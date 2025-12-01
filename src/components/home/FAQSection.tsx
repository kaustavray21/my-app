import { useEffect, useRef, useState } from 'react';

const faqs = [
    {
        question: "How do I book a trip?",
        answer: "Simply create a free account, browse our destinations catalog, select the package that suits you, and click 'Book Now'. Our team will handle the rest."
    },
    {
        question: "Is flight and accommodation included?",
        answer: "Most of our comprehensive packages include accommodation, local transfers, and guided tours. Flights are usually booked separately to give you flexibility, but we can assist with arrangements."
    },
    {
        question: "What is your cancellation policy?",
        answer: "We offer flexible cancellation up to 30 days before departure for a full refund. For cancellations within 30 days, specific terms apply based on the destination and booking type."
    }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [isOpen]);

    return (
        <div
            className="border-b border-gray-200 last:border-0"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`
                    w-full text-left py-4 px-6 font-bold text-lg transition-colors duration-300 flex justify-between items-center cursor-pointer
                    ${isOpen ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-800 hover:bg-teal-600 hover:text-white'}
                `}
            >
                {question}
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className="overflow-hidden transition-all duration-500 ease-out bg-white"
                style={{ maxHeight: height, opacity: isOpen ? 1 : 0 }}
            >
                <div ref={contentRef} className="p-6 text-gray-600 leading-relaxed border-x border-gray-100">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default function FAQSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
        <div
            ref={sectionRef}
            id="faq"
            className={`
                container mx-auto px-4 py-24
                transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 section-title">
                Common Questions
            </h2>

            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-sm border border-gray-200">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
}