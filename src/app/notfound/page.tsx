import PageNotFound from "@/components/PageNotFound";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Green Future | Lỗi truy cập",
};

const NotFound = () => {
  return (
    <main className="grid h-screen place-items-center">
      <PageNotFound />
    </main>
  );
};

export default NotFound;
