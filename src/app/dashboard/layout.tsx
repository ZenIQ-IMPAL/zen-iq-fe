"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "My Course", href: "/dashboard/my-course" },
    { name: "Learning Progress", href: "/dashboard/learning-progress" },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col justify-between border-r fixed left-0 top-0 h-full z-10"
        style={{
          backgroundColor: "var(--color-sidebar-background)",
          borderColor: "var(--color-sidebar-border)",
        }}
      >
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/img-logo-dark.png"
                alt="ZenIQ Logo"
                width={100}
                height={50}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[var(--color-sidebar-accent)] text-[var(--primary)] font-semibold"
                      : "text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-accent)]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-[var(--error)] text-white py-3 text-sm font-semibold hover:opacity-90 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto ml-64"
        style={{ backgroundColor: "var(--color-gray-zen-10)" }}
      >
        {children}
      </main>
    </div>
  );
}
