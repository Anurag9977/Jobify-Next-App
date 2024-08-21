import { Grey_Qo } from "next/font/google";
import Image from "next/image";
import LandingImg from "@/assets/landing-image.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

const greyQo = Grey_Qo({ subsets: ["latin"], weight: ["400"] });

function HomePage() {
  const { userId } = auth();
  return (
    <main className="pb-16 align-page-center">
      <header className={`${greyQo.className} my-4`}>
        <h1 className="tracking-wider text-6xl font-semibold">Jobify</h1>
      </header>
      <section className="mt-28 grid grid-cols-[1fr,30rem] gap-x-16">
        <div className="flex flex-col gap-y-8">
          <h2 className="text-2xl capitalize tracking-wide font-semibold">
            job tracking <span>application</span>
          </h2>
          <p className="text-base text-justify leading-relaxed">
            Easily keep track of job applications with this comprehensive job
            tracking app - <span className="font-bold">Jobify.</span> <br />
            From application deadlines to interview schedules, stay on top of
            every step in your job search. Organize, monitor, and optimize your
            job hunt for success.
          </p>
          {userId ? (
            <Button className="w-max" asChild>
              <Link href="/jobs">Get Started</Link>
            </Button>
          ) : (
            <SignInButton
              mode="modal"
              forceRedirectUrl={process.env.CLERK_REDIRECT_URL}
            >
              <Button className="w-max">Get Started</Button>
            </SignInButton>
          )}
        </div>
        <Image
          src={LandingImg}
          alt="landing-image"
          priority
          className="hidden lg:block h-full w-full object-cover"
        />
      </section>
    </main>
  );
}
export default HomePage;
