import HeroSection from './home/HeroSection';
import StatusSection from './home/StatusSection';
import AboutSection from './home/AboutSection';
import FeaturedCoursesSection from './home/FeaturedCoursesSection';
import TestimonialsSection from './home/TestimonialsSection';
import FAQSection from "./home/FAQSection.tsx";
import SocialFollowSection from "./home/SocialFollowSection.tsx";

export default function HomePage() {
    return (
        <main>
            <HeroSection/>
            <StatusSection/>
            <AboutSection/>
            <FeaturedCoursesSection/>
            <TestimonialsSection/>
            <FAQSection/>
            <SocialFollowSection/>
        </main>
    );
}