import { Button } from "@/components/ui/button";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function PaginationSection({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationSectionProps) {
  return (
    <div className="flex justify-center items-center mt-10 gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="text-sm"
      >
        Prev
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => setCurrentPage(i + 1)}
          className="text-sm"
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="text-sm"
      >
        Next
      </Button>
    </div>
  );
}
