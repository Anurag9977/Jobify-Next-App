import { Separator } from "../ui/separator";
import PaginationButtons from "./PaginationButtons";

function PaginationContainer({
  totalJobs,
  page,
  totalPages,
}: {
  totalJobs: number;
  page: number;
  totalPages: number;
}) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="tracking-wide capitalize text-sm sm:text-base lg:text-lg font-medium">
          {totalJobs} job{totalJobs > 1 && "s"} found
        </h1>
        {totalPages > 1 && (
          <PaginationButtons page={page} totalPages={totalPages} />
        )}
      </div>
      <Separator className="mt-2" />
    </section>
  );
}
export default PaginationContainer;
