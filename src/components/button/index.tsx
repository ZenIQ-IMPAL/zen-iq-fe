"use client";

import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "default" | "outline";
    className?: string;
    children: ReactNode;
    disabled?: boolean;
}

export function Button({
    variant = "default",
    className = "",
    children,
    disabled = false,
    ...props
}: ButtonProps) {
    const baseClasses = styles.button;
    const variantClasses = styles[`button--${variant}`];

    const combinedClasses = [baseClasses, variantClasses, className]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={combinedClasses} {...props} disabled={disabled}>
            {children}
        </button>
    );
}
