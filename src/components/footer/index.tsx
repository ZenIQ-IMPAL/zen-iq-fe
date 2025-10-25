import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/payment", label: "Payment" },
    { href: "/success-story", label: "Success Story" },
    { href: "/about", label: "About Us" },
];

export const Footer = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <footer className="bg-dark-blue-zen-ia2 w-full">
            <div className="custom-container py-12">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Logo */}
                    <div className="mb-4">
                        <Image
                            src="/images/img-logo-light.png"
                            alt="ZenIQ Logo"
                            width={160}
                            height={60}
                            className="h-14 w-auto"
                        />
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full max-w-2xl space-y-6">
                        <h4 className="text-white font-semibold text-xl md:text-2xl">
                            Subscribe to get a newsletter
                        </h4>

                        {/* Email Subscription Form */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="w-full sm:flex-1 bg-dark-blue-zen-ia2 border-white/30 text-white placeholder:text-white/60 rounded-full px-6 py-5 focus:border-primary focus:ring-primary"
                            />
                            <Button
                                type="button"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-5 rounded-full transition-all duration-300"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    {/* Footer Navigation Links */}
                    <nav className="pt-6">
                        <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80">
                            {footerLinks.map((link, index) => (
                                <li
                                    key={link.href}
                                    className="flex items-center"
                                >
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition-colors duration-200 text-sm md:text-base"
                                    >
                                        {link.label}
                                    </Link>
                                    {index < footerLinks.length - 1 && (
                                        <span className="ml-4 md:ml-6 text-white/40">
                                            |
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Copyright */}
                    <div className="pt-6 border-t border-white/10 w-full">
                        <p className="text-white/70 text-sm md:text-base">
                            ©{getCurrentYear()} ZenIQ Education
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
