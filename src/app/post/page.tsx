import React from "react";

import { BreadScrumb } from "@/components/common";
import PostList from "./PostList";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Fricks | Bài viết",
//   description:
//     "Đọc các bài viết liên quan đến vật liệu xây dựng, hướng dẫn sử dụng và mẹo cải tiến công trình trên Fricks.",
//   keywords: [
//     "bài viết",
//     "hướng dẫn",
//     "mẹo xây dựng",
//     "vật liệu xây dựng",
//     "Fricks",
//   ],
//   openGraph: {
//     title: "Fricks | Bài viết",
//     description:
//       "Khám phá các bài viết về vật liệu xây dựng và các giải pháp tối ưu cho công trình của bạn trên Fricks.",
//     url: "https://www.frickshop.site/post",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fpost_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Bài viết",
//       },
//     ],
//   },
// };

const PagePost = () => {
  const items = [
    {
      title: "Bài viết",
    },
  ];
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-5">
        <BreadScrumb items={items} />
      </div>
      <div>
        <PostList></PostList>
      </div>
    </main>
  );
};

export default PagePost;
