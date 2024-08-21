"use client";

import { navLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const path = usePathname();
  return (
    <aside className="h-full flex flex-col items-center px-8">
      {navLinks.map((link, index) => {
        const { label, href, icon } = link;
        const linkClasses =
          path === href
            ? "bg-muted-foreground"
            : "group hover:bg-muted-foreground  duration-300";
        const labelClasses =
          path === href
            ? "text-secondary"
            : "group-hover:text-secondary duration-300";
        return (
          <Link
            key={index}
            href={href}
            className={`w-full px-4 py-2 rounded-lg mb-4 flex justify-center items-center ${linkClasses}`}
          >
            <div className={`flex items-center gap-x-2 ${labelClasses}`}>
              {icon}
              <span className="capitalize tracking-wide font-medium">
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
export default Sidebar;
