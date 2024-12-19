import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`} passHref>
          <Button variant="outline">Previous</Button>
        </Link>
      )}
      <span className="flex items-center px-4 py-2 border rounded-md bg-gray-100">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`} passHref>
          <Button variant="outline">Next</Button>
        </Link>
      )}
    </div>
  );
}
