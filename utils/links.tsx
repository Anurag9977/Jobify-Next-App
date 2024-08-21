import { ChartColumnBig, LayoutList, ListPlus } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  smallIcon: React.ReactElement;
  icon: React.ReactElement;
};

export const navLinks: NavLink[] = [
  {
    label: "all jobs",
    href: "/jobs",
    smallIcon: <LayoutList size={18} />,
    icon: <LayoutList />,
  },
  {
    label: "add job",
    href: "/add-job",
    smallIcon: <ListPlus size={18} />,
    icon: <ListPlus />,
  },
  {
    label: "stats",
    href: "/stats",
    smallIcon: <ChartColumnBig size={18} />,
    icon: <ChartColumnBig />,
  },
];
