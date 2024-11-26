import { BreadScrumb } from "@/components/common";
import PostDetail from "./Detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fricks | Chi tiết bài viết",
  description:
    "Khám phá các thông tin chi tiết và kiến thức hữu ích về vật liệu xây dựng trong bài viết này trên Fricks.",
  keywords: [
    "chi tiết bài viết",
    "vật liệu xây dựng",
    "hướng dẫn sử dụng",
    "mẹo xây dựng",
    "Fricks",
    "kiến thức xây dựng",
  ],
  openGraph: {
    title: "Fricks | Chi tiết bài viết",
    description:
      "Tìm hiểu sâu về các chủ đề liên quan đến vật liệu xây dựng và những mẹo hữu ích để cải thiện công trình của bạn trên Fricks.",
    url: "https://www.frickshop.site/post/[postId]",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Farticle_image.png?alt=media",
        width: 1200,
        height: 630,
        alt: "Fricks | Chi tiết bài viết",
      },
    ],
  },
};

const PostDetailPage = () => {
  const items = [
    {
      title: "Chi tiết bài viết",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-10">
          <PostDetail />
        </div>
      </section>
    </main>
  );
};

export default PostDetailPage;
