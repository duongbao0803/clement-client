import { Metadata } from "next";
import ChangePasswordForm from "./ChangePasswordForm";

// export const metadata: Metadata = {
//   title: "Fricks | Đổi mật khẩu",
//   description:
//     "Đổi mật khẩu tài khoản Fricks của bạn để bảo mật thông tin cá nhân và mua sắm an toàn.",
//   keywords: [
//     "đổi mật khẩu",
//     "mật khẩu cũ",
//     "mật khẩu mới",
//     "xác nhận mật khẩu",
//     "Fricks",
//     "bảo mật tài khoản",
//   ],
//   openGraph: {
//     title: "Fricks | Đổi mật khẩu",
//     description:
//       "Bảo mật tài khoản của bạn bằng cách thay đổi mật khẩu thường xuyên trên Fricks.",
//     url: "https://www.frickshop.site/user/password",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fpassword_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Đổi mật khẩu",
//       },
//     ],
//   },
// };

const ChangePasswordPage = () => {
  return (
    <main>
      <h1 className="mb-2">Đổi mật khẩu</h1>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm lg:px-16">
        <ChangePasswordForm />
      </div>
    </main>
  );
};

export default ChangePasswordPage;
