"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./styles.module.css";

interface FilterSectionProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function FilterSection({ filter, setFilter }: FilterSectionProps) {
  return (
    <div className={styles.container}>
      <Input
        type="text"
        placeholder="Find your favorite course"
        className={styles.input}
      />

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue placeholder="Select filter" className={styles.selectValuePlaceholder} />
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
