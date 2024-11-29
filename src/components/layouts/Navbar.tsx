"use client";

import IconWeb from "@/assets/images/logo/logo_web_navbar.png";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavElement from "./NavElement";

const Navbar = () => {
  return (
    <header>
      <section className="container mx-auto flex w-full items-center justify-between bg-[#fff] transition-all duration-500">
        <section className="flex justify-center">
          <Link href="/">
            <Image
              src={IconWeb}
              width={90}
              alt="icon"
              quality={100}
              className="hidden lg:block"
            />
            <Image
              src={IconWeb}
              width={90}
              alt="icon"
              quality={100}
              className="lg:hidden"
            />
          </Link>
        </section>
        <section className="hidden items-center gap-8 lg:flex">
          <NavElement />
        </section>

        <section className="lg:hidden">
          <MobileNav />
        </section>
      </section>
    </header>
  );
};

export default Navbar;
