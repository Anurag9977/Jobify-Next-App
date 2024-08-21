import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import ClerkLoader from "@/components/global/ClerkLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobify",
  description: "Job tracking application",
  keywords: ["NextJS", "Clerk", "TypeScript", "Shadcn"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            {/* <ClerkLoading>
              <ClerkLoader />
            </ClerkLoading>
            <ClerkLoaded>{children}</ClerkLoaded> */}
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
