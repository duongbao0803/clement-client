import "@/app/globals.css";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogout } from "@/hooks/useLogout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import SidebarButtons from "./SidebarButtons";
// import NavElement from "./NavElement";

const MobileSide = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeButton, setActiveButton] = useState<number>(1);
  const { logout } = useLogout();

  useEffect(() => {
    switch (pathname) {
      case "/user/personal":
        setActiveButton(1);
        break;
      case "/user/password":
        setActiveButton(2);
        break;
      case "/user/ordered":
        setActiveButton(3);
        break;
      default:
        setActiveButton(0);
    }
  }, [pathname]);

  const handleButtonClick = (buttonName: number, path: string) => {
    setActiveButton(buttonName);
    router.push(path);
  };

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuKebab className="rotate-90 text-4xl font-black text-primary" />
      </SheetTrigger>
      <SheetContent side={"left"} className="mx-auto flex flex-col">
        <nav className="mx-5 mt-32 flex flex-col items-center justify-center">
          <div className="mb-16 flex justify-center text-center">
            <Image
              src={IconWeb}
              height={150}
              width={150}
              alt="icon"
              quality={100}
            />
          </div>
          <SidebarButtons
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            logout={logout}
          ></SidebarButtons>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default React.memo(MobileSide);
