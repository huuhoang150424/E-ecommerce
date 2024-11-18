import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
interface Props {
  currentPage?: number;
  totalPage?: number;
  className?: string
}


export default function Paginator({totalPage,currentPage,className}:Props) {
  return (
    <Pagination className={cn('justify-end ',className)}>
    <PaginationContent className="  ">
      <PaginationItem>
        <PaginationPrevious  />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink >1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink  isActive >
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink >3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext  />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}
