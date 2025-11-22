"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../../lib/validation";
import Image from "next/image";
import { loginAction, LoginState } from "./action";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loginState, setLoginState] = useState<LoginState>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await loginAction(loginState, formData);
        setLoginState(result);

        if (result.success) {
            toast.success("Login successful!");
            setTimeout(() => router.push("/"), 1500);
            setIsSubmitting(false);
            return;
        }

        const fieldErrors = result.fieldErrors || {};
        Object.entries(fieldErrors).forEach(([field, message]) => {
            setError(field as keyof LoginFormData, { message });
        });

        toast.error(result.error || "Login failed");
        setIsSubmitting(false);
    };

    return (
        <div className="flex min-h-screen bg-bg-white">
            {/* Menambahkan gambar di sisi kiri */}
            <div className="w-full sm:w-1/2 flex items-center justify-center px-4">
                <Image
                    src="/images/login.png"
                    alt="Register Image"
                    width={450}
                    height={450}
                />
            </div>

            <div className="w-full sm:w-1/2 flex flex-col justify-center items-start p-8">
                <div className="w-full">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-left">
                        Login
                    </h1>
                    <p className="text-md mb-6 text-gray-600 text-left">
                        Login to your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 w-full max-w-sm"
                >
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2"
                            errorMessage={errors.email?.message}
                            {...register("email")}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-2 pr-10"
                                errorMessage={errors.password?.message}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="w-full max-w-sm mt-4 text-center text-sm">
                    Don't have an account?{" "}
                </div>
                <div className="w-full max-w-sm mt-4 text-center text-sm">
                    <Link
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
