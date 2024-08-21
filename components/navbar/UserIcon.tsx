"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

function UserIcon() {
  const { theme, systemTheme } = useTheme();
  const isDarkTheme =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return <UserButton appearance={isDarkTheme ? { baseTheme: dark } : {}} />;
}
export default UserIcon;
