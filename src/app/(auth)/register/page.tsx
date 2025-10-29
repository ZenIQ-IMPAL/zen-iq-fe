'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; 
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../../../lib/validation"; 
import Image from "next/image"; 

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full sm:w-1/2 flex items-center justify-center px-4">
        <Image
          src="/images/register.png"
          alt="Register Image"
          width={450}
          height={450}
        />
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start p-8">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-left">Register</h1>
          <p className="text-md mb-6 text-gray-600 text-left">Register your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              placeholder="Enter your name"
              className={`w-full px-4 py-2 mt-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 mt-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 mt-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>}
          </div>

          {/* Register Button */}
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700">
            Register
          </Button>
        </form>

        <div className="w-full max-w-sm mt-4 text-center text-sm">
          Already have an account?{" "}
        </div>
        <div className="w-full max-w-sm mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
