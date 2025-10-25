"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
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
                    <Link href="/pricing" className="text-gray-700 hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                        About Us
                    </Link>
                    <Link href="/success-story" className="text-gray-700 hover:text-primary transition-colors">
                        Success Story
                    </Link>
                </div>

                <div className="hidden lg:block">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">U</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
                <div className="max-w-md w-full">
                    {/* Success Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Payment Successful!
                        </h1>
                        
                        <p className="text-gray-600 mb-8 leading-relaxed">
                             Your payment was completed successfully, and your learning journey just leveled up. You now have full access to everything ZenIQ has to offer.
                        </p>

                        {/* Go to Dashboard Button */}
                        <Link href="/courses">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg">
                                Start Learning
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 py-8 mt-auto">
                <div className="custom-container">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">N</span>
                            </div>
                            <span className="text-white text-xl font-bold">ZenIQ</span>
                        </div>

                        {/* Copyright */}
                        <div className="text-white/70 text-sm">
                            © {new Date().getFullYear()} ZenIQ. All rights reserved.
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">f</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">t</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
