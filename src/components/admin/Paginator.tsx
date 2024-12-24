import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  currentPage?: number;
  totalPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

interface listPage {
  page?: string;
}

export default function Paginator({ 
  totalPage = 1, 
  currentPage = 1, 
  onPageChange, 
  className 
}: Props) {
  const [activePage, setActivePage] = useState(currentPage);
  let listPage: listPage[] = [];

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setActivePage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  if (totalPage < 4) {
    for (let i = 1; i <= totalPage; i++) {
      listPage.push({ page: String(i) });
    }
  } else {
    listPage.push({ page: "1" });
    if (activePage > 3) {
      listPage.push({ page: "..." });
    }
    for (let i = Math.max(2, activePage - 1); i <= Math.min(activePage + 1, totalPage - 1); i++) {
      listPage.push({ page: String(i) });
    }
    if (activePage < totalPage - 2) {
      listPage.push({ page: "..." });
    }
    listPage.push({ page: String(totalPage) });
  }
  return (
    <Pagination className={cn("justify-end", className)}>
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(activePage - 1)} 
          />
        </PaginationItem>
        {listPage.map((item, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={Number(item.page) === activePage}
              onClick={() => handlePageChange(Number(item.page))}
            >
              {item?.page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(activePage + 1)} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
