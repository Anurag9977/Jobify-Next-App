import { Separator } from "../ui/separator";

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="capitalize md:text-xl lg:text-3xl tracking-wide font-semibold">
        {title}
      </h1>
      <Separator className="mt-2" />
    </div>
  );
}
export default SectionTitle;
