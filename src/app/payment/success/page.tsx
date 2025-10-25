"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <Navbar />

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
            <Footer />
        </div>
    );
}
