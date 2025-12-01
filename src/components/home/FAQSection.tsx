import { useEffect, useRef, useState } from 'react';

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer: "Simply sign up for a free account, browse our course catalog from your dashboard, and click the 'enroll' button on any course you're interested in. It's that simple!"
    },
    {
        question: "Are the courses self-paced?",
        answer: "Yes, absolutely. All our courses are designed to be self-paced so you can learn at your convenience, whenever and wherever you want. You can start, pause, and resume your lessons at any time."
    },
    {
        question: "Can I access courses on mobile devices?",
        answer: "Yes, our platform is fully responsive, meaning you can access your courses and watch videos on any device, including desktops, tablets, and smartphones."
    }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    // Update height when isOpen changes or contentRef becomes available
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
                    ${isOpen ? 'bg-[#663F83] text-white' : 'bg-gray-50 text-gray-800 hover:bg-[#663F83] hover:text-white'}
                `}
            >
                {question}
                {/* Arrow Icon */}
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
                Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-sm border border-gray-200">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
}