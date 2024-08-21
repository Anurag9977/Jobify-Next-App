import { cn } from "@/lib/utils";

type JobInfoProps = {
  icon: React.ReactNode;
  name: string;
  className?: string;
};

function JobInfo({ icon, name, className }: JobInfoProps) {
  const jobPropsClasses =
    "flex justify-center items-center gap-2 text-sm bg-muted rounded py-2";
  return (
    <div className={cn(jobPropsClasses, className)}>
      {icon}
      <h2 className="capitalize">{name}</h2>
    </div>
  );
}
export default JobInfo;
