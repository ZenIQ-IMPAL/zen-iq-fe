"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function FilterSection({ filter, setFilter }: FilterSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between mb-8 mt-[100px]">
      <Input
        type="text"
        placeholder="Find your favorite course"
        className="
          w-full
          sm:w-[280px]
          md:w-[319px]
          h-[50px]
          border border-[#4F4F4F]
          rounded-[10px]
          placeholder:text-[#828282]
          focus:outline-none focus:ring-2 focus:ring-primary
          transition
        "
      />

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger
          className="
            w-full
            sm:w-[180px]
            md:w-[212px]
            h-[50px]
            min-h-[50px]
            border border-[#4F4F4F]
            rounded-[10px]
            px-4
            placeholder:text-[#828282]
            focus:outline-none focus:ring-2 focus:ring-primary
            transition
            opacity-100
            transform-none
          "
        >
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New Courses">New Courses</SelectItem>
          <SelectItem value="Popular">Popular</SelectItem>
          <SelectItem value="Top Rated">Top Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
