import { navLinks } from "@/utils/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { AlignLeft } from "lucide-react";
import { Button } from "../ui/button";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={5}>
        {navLinks.map((link, index) => {
          const { label, href, smallIcon } = link;
          return (
            <DropdownMenuItem key={index}>
              <Link href={href} className="py-1 my-1 cursor-pointer">
                <div className="flex items-center gap-x-2">
                  {smallIcon}
                  <span className="text-sm capitalize tracking-wide">
                    {label}
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
