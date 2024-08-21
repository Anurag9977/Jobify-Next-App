import { Grey_Qo } from "next/font/google";
import Link from "next/link";

const greyQo = Grey_Qo({ subsets: ["latin"], weight: ["400"] });

function Logo() {
  return (
    <Link href="/">
      <h1 className={`${greyQo.className} tracking-wider text-4xl`}>Jobify</h1>
    </Link>
  );
}
export default Logo;
