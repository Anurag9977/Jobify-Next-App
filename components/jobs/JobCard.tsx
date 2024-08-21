import {
  CalendarCheck2,
  CheckCheck,
  ClipboardPen,
  Handshake,
  LaptopMinimal,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Job } from "@prisma/client";
import JobInfo from "./JobInfo";
import DeleteJobButton from "./DeleteJobButton";

function JobCard(props: Job) {
  const { id, position, company, location, status, mode, type, createdAt } =
    props;

  //Job Applied Date
  const jobDate = new Date(createdAt).toDateString();

  //Job Status Tailwind Classes
  const jobStatusColor =
    status === "pending"
      ? "bg-border"
      : status === "interview"
      ? "bg-primary text-primary-foreground"
      : status === "offer"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="tracking-wide mb-1">{position}</CardTitle>
        <CardDescription className="uppercase tracking-wider text-xs font-medium">
          {company}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="py-4 grid grid-cols-2  gap-4">
        <JobInfo icon={<MapPin size={18} />} name={location} />
        <JobInfo
          icon={<CheckCheck size={18} />}
          name={status}
          className={jobStatusColor}
        />
        <JobInfo icon={<Handshake size={18} />} name={type} />
        <JobInfo icon={<LaptopMinimal size={18} />} name={mode} />
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="grid grid-cols-2 gap-4 pb-4">
        <div className="flex items-center gap-3">
          <TooltipProvider delayDuration={200}>
            {/* Edit Job Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" asChild>
                  <Link href={`/jobs/${id}`}>
                    <ClipboardPen size={16} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize tracking-wide">edit job</p>
              </TooltipContent>
            </Tooltip>
            {/* Delete Job Button */}
            <DeleteJobButton jobID={id} />
          </TooltipProvider>
        </div>
        <div>
          <JobInfo icon={<CalendarCheck2 size={18} />} name={jobDate} />
        </div>
      </CardFooter>
    </Card>
  );
}
export default JobCard;
