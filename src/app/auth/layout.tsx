"use client";
import { Footer, Navbar } from "@/components/layouts";
import ProgressBar from "@/components/ProgressBar";
import useUserInfo from "@/hooks/useUserInfo";
import { FloatButton } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { usePathname } from "next/navigation";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/auth" && pathname !== "/notfound";
  const userInfo = useUserInfo();

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <FloatButton.BackTop className="!fixed !bottom-[150px] !right-[5px]" />
      <ProgressBar />
      {showNavbar && <Footer />}
    </>
  );
}
