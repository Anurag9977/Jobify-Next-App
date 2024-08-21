import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PaginationButtons({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const path = usePathname();
  const { push } = useRouter();
  const currentPage = searchParams.get("page") || "1";

  function renderPageButton(value: number) {
    if (value === 0) {
      return (
        <Button
          asChild
          variant="outline"
          size="icon"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
        >
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </Button>
      );
    }
    return (
      <Button
        asChild
        variant={currentPage === value.toString() ? "default" : "outline"}
        size="icon"
        className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
        onClick={() => handlePageChange(value)}
      >
        <PaginationItem>{value}</PaginationItem>
      </Button>
    );
  }

  function handlePageChange(value: number) {
    newSearchParams.set("page", value.toString());
    push(`${path}?${newSearchParams.toString()}`);
  }

  function handlePrevButton(value: number) {
    if (value === 1) {
      return;
    }
    const prevPage = value - 1;
    newSearchParams.set("page", prevPage.toString());
    push(`${path}?${newSearchParams.toString()}`);
  }

  function handleNextButton(value: number) {
    if (value === totalPages) {
      return;
    }
    const nextPage = value + 1;
    newSearchParams.set("page", nextPage.toString());
    push(`${path}?${newSearchParams.toString()}`);
  }

  //Pages Array Calculation Start
  let pagesArray: Array<React.ReactNode> = [];

  //First Page
  pagesArray.push(renderPageButton(1));
  //SecondPage
  if (page === 1) {
    pagesArray.push(renderPageButton(2));
  }

  //Dots
  if (page !== 1 && page !== 2) {
    pagesArray.push(renderPageButton(0));
  }

  //Current Page
  if (page !== 1 && page !== totalPages) {
    pagesArray.push(renderPageButton(page));
  }

  //Dots
  if (page !== totalPages && page !== totalPages - 1) {
    pagesArray.push(renderPageButton(0));
  }

  //Second Last Page
  if (page === totalPages) {
    pagesArray.push(renderPageButton(totalPages - 1));
  }
  //Last Page
  pagesArray.push(renderPageButton(totalPages));
  //Pages Array Calculation End

  return (
    <Pagination className="w-max mx-0">
      <PaginationContent className="gap-1 tracking-wide">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
          onClick={() => handlePrevButton(page)}
        >
          <PaginationItem>
            <ChevronLeft size={18} strokeWidth={3} />
          </PaginationItem>
        </Button>
        <>
          {pagesArray.map((item, index) => {
            return <React.Fragment key={index}>{item}</React.Fragment>;
          })}
        </>
        <Button
          asChild
          variant="outline"
          size="icon"
          className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
          onClick={() => handleNextButton(page)}
        >
          <PaginationItem>
            <ChevronRight size={18} strokeWidth={3} />
          </PaginationItem>
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationButtons;
