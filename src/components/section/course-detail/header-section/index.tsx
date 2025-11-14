"use client";

interface HeaderSectionProps {
  title: string;
}

export function HeaderSection({ title }: HeaderSectionProps) {
  return <h1 className="text-3xl font-bold mb-6">{title}</h1>;
}
