import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "@/app/globals.css";
import NavElement from "./NavElement";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-4xl font-black text-primary" />
      </SheetTrigger>
      <SheetContent side={"right"} className="flex flex-col">
        <div className="mb-12 mt-32 flex justify-center text-center">
          <Link href="/">
            <Image
              src={IconWeb}
              height={150}
              width={150}
              alt="icon"
              quality={100}
            />
          </Link>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8">
          <NavElement />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
