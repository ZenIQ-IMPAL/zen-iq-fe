'use client"';

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AboutZenIQSection } from "@/components/section/homepage/about-us-section";
import { ExploreCourseSection } from "@/components/section/homepage/course-section";
import { HeroSection } from "@/components/section/homepage/hero";
import { PricingSection } from "@/components/section/homepage/pricing-section";
import { SuccessStorySection } from "@/components/section/homepage/success-story-section";

export default function Home() {
    return (
        <main className="">
            <Navbar />
            <HeroSection />
            <ExploreCourseSection />
            <SuccessStorySection />
            <AboutZenIQSection />
            <PricingSection />
            <Footer />
        </main>
    );
}
