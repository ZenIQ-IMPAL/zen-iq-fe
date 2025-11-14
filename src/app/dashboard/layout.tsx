"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "My Course", href: "/dashboard/my-course" },
    { name: "Learning Progress", href: "/dashboard/learning-progress" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 flex items-center px-4 shadow bg-white z-20">
        <button onClick={() => setOpen(true)}>
          <span className="text-2xl">☰</span>
        </button>
        <span className="ml-4 font-semibold text-lg">Dashboard</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 h-full z-30 w-64 
    flex flex-col border-r 
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
        style={{
          backgroundColor: "var(--color-sidebar-background)",
          borderColor: "var(--color-sidebar-border)",
        }}
      >
        {/* Top Section */}
        <div>
          {/* Close button mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {/* Logo */}
          <div className="h-20 flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/img-logo-dark.png"
                alt="ZenIQ Logo"
                width={100}
                height={50}
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
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-[var(--error)] text-white py-3 text-sm font-semibold hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-20"
        />
      )}

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto md:ml-64 pt-16 md:pt-0"
        style={{ backgroundColor: "var(--color-gray-zen-10)" }}
      >
        {children}
      </main>
    </div>
  );
}
