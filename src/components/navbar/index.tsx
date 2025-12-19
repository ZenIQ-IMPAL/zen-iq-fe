"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type React from "react";
import { useAuth } from "@/app/context/auth";

const courseLinks = [
    { href: "/courses", label: "All Courses" },
    { href: "/courses/free", label: "Free Courses" },
    { href: "/courses/popular", label: "Popular Courses" },
];

const navLinks = [
    { href: "#success-story", label: "Success Story", isScroll: true },
    { href: "#about-us", label: "About Us", isScroll: true },
    { href: "#pricing", label: "Pricing", isScroll: true },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);

    const { user, loading } = useAuth();
    const isLoggedIn = !!user;

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offset = 70;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
            setIsOpen(false);
        }
    };

    return (
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

            <div className="hidden lg:block">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Courses
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px]">
                                    {courseLinks.map((link) => (
                                        <li key={link.href}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={link.href}
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                >
                                                    {link.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) =>
                                            link.isScroll &&
                                            handleSmoothScroll(e, link.href)
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden lg:block">
                {loading ? (
                    <div className="flex items-center space-x-2 px-3 py-1">
                        <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                ) : isLoggedIn ? (
                    <Link
                        href={"/dashboard"}
                        className="cursor-pointer"
                        target="_blank"
                    >
                        <div className="flex items-center space-x-2 px-3 py-1">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="text-gray-700 font-medium">
                                {user.full_name}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Button className="bg-primary">Login</Button>
                    </Link>
                )}
            </div>

            <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="border border-gray-200"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[300px] sm:w-[400px]"
                    >
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 p-4">
                            <Collapsible
                                open={isCourseOpen}
                                onOpenChange={setIsCourseOpen}
                            >
                                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium hover:text-primary transition-colors">
                                    Courses
                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${
                                            isCourseOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2 ml-4 space-y-2">
                                    {courseLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-2 text-gray-600 hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) =>
                                        link.isScroll &&
                                        handleSmoothScroll(e, link.href)
                                    }
                                    className="py-2 text-lg font-medium hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {loading ? (
                                <div className="flex items-center space-x-2 px-3 py-1 mt-4">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                </div>
                            ) : isLoggedIn ? (
                                <Link
                                    href={"/dashboard"}
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center space-x-2 px-3 py-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {user.full_name}
                                        </span>
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login" className="w-full mt-4">
                                    <Button className="bg-primary w-full">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};
