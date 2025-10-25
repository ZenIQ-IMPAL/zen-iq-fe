"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const planDetails = {
    monthly: {
        title: "ZenIQ Pro - Monthly",
        price: "$19",
        period: "per month",
        features: [
            "Full access to all courses",
            "Personalized learning paths",
            "Cancel anytime"
        ]
    },
    "6months": {
        title: "ZenIQ Pro - 6 Months",
        price: "$59",
        period: "per month",
        features: [
            "Everything in Monthly",
            "Downloadable resources",
            "Early access to new features"
        ]
    },
    "12months": {
        title: "ZenIQ Pro - 12 Months",
        price: "$119",
        period: "per month",
        features: [
            "All features unlocked",
            "1-on-1 mentoring",
            "Premium certificate badges"
        ]
    }
};

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const [selectedPlan, setSelectedPlan] = useState("6months");

    useEffect(() => {
        const plan = searchParams.get('plan');
        if (plan && planDetails[plan as keyof typeof planDetails]) {
            setSelectedPlan(plan);
        }
    }, [searchParams]);

    const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails["6months"];
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <nav className="flex items-center justify-between p-4 custom-container sticky top-0 bg-white shadow-sm z-50">
                <Link href="/">
                    <Image
                        src="/images/img-logo-dark.png"
                        alt="ZenIQ Logo"
                        width={1920}
                        height={1080}
                        className="h-9 w-20"
                    />
                </Link>

                <div className="hidden lg:flex items-center space-x-8">
                    <Link href="/courses" className="text-gray-700 hover:text-primary transition-colors">
                        Courses
                    </Link>
                    <Link href="#pricing" className="text-gray-700 hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href="#about-us" className="text-gray-700 hover:text-primary transition-colors">
                        About Us
                    </Link>
                    <Link href="#success-story" className="text-gray-700 hover:text-primary transition-colors">
                        Success Story
                    </Link>
                </div>

                <div className="hidden lg:block">
                    <Link href="/login">
                        <Button className="bg-primary">Login</Button>
                    </Link>
                </div>
            </nav>

            {/* Payment Banner */}
            <div className="bg-primary py-12">
                <div className="custom-container">
                    <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
                        Payment
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="custom-container -mt-6 relative z-10 pb-8">
                <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Left Panel - Subscription Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* You're Almost There Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                You're Almost There
                            </h2>
                            <p className="text-gray-600 mb-3 text-sm">
                                Just a quick check before you unlock your learning journey.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Logged in as: <span className="font-bold text-primary">your@email.com</span>
                            </p>
                        </div>

                        {/* Subscription Features */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {currentPlan.title}
                            </h3>
                            <div className="space-y-3">
                                {currentPlan.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Payment Summary */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {currentPlan.title}
                        </h3>

                        {/* Plan Details */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Plan</span>
                                <span className="text-sm font-medium text-gray-900">{currentPlan.title}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-600">Billing</span>
                                <span className="text-sm text-gray-600">{currentPlan.period}</span>
                            </div>
                        </div>

                        {/* Discount Code Section */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Code
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter your discount code"
                                className="w-full"
                            />
                        </div>

                        {/* Total Price Section */}
                        <div className="flex justify-between items-center mb-6 py-3 border-t border-gray-200">
                            <span className="text-base font-medium text-gray-900">
                                Total price
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                                {currentPlan.price}
                            </span>
                        </div>

                        {/* Complete Payment Button */}
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3">
                            Complete Payment
                        </Button>
                    </div>
                </div>
            </div>

            {/* Compact Footer */}
            <footer className="bg-dark-blue-zen-ia2 w-full">
                <div className="custom-container py-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Logo */}
                        <div>
                            <Image
                                src="/images/img-logo-light.png"
                                alt="ZenIQ Logo"
                                width={120}
                                height={45}
                                className="h-10 w-auto"
                            />
                        </div>

                        {/* Newsletter Section - Compact */}
                        <div className="w-full max-w-lg space-y-3">
                            <h4 className="text-white font-semibold text-lg">
                                Subscribe to get a newsletter
                            </h4>

                            {/* Email Subscription Form */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-sm mx-auto">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full sm:flex-1 bg-dark-blue-zen-ia2 border-white/30 text-white placeholder:text-white/60 rounded-full px-4 py-3 focus:border-primary focus:ring-primary"
                                />
                                <Button
                                    type="button"
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </div>

                        {/* Footer Navigation Links */}
                        <nav className="pt-2">
                            <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/80">
                                {[
                                    { href: "/courses", label: "Courses" },
                                    { href: "/payment", label: "Payment" },
                                    { href: "/success-story", label: "Success Story" },
                                    { href: "/about", label: "About Us" },
                                ].map((link, index) => (
                                    <li
                                        key={link.href}
                                        className="flex items-center"
                                    >
                                        <Link
                                            href={link.href}
                                            className="hover:text-white transition-colors duration-200 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                        {index < 3 && (
                                            <span className="ml-3 md:ml-4 text-white/40">
                                                |
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Copyright */}
                        <div className="pt-3 border-t border-white/10 w-full">
                            <p className="text-white/70 text-sm">
                                ©{new Date().getFullYear()} ZenIQ Education
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
