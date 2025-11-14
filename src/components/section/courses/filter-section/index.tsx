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
  search: string;
  setSearch: (value: string) => void;
}

export function FilterSection({
  filter,
  setFilter,
  search,
  setSearch,
}: FilterSectionProps) {
  return (
    <div className={styles.container}>
      <Input
        type="text"
        placeholder="Find your favorite course"
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue
            placeholder="Select filter"
            className={styles.selectValuePlaceholder}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New Courses">New Courses</SelectItem>
          <SelectItem value="Recommended">Recomended Course</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
