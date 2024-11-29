import Image from "next/image";
import Logo from "@/assets/images/logo/logo_web.png";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 transition-all duration-500 lg:grid-cols-5 lg:py-8">
          <div className="flex items-center text-sm">
            <Image
              alt="logo"
              src={Logo}
              height={700}
              width={700}
              quality={100}
              className="w-64"
            />
          </div>
          <div>
            <h2 className="text-gray-90 mb-6 text-sm font-semibold uppercase">
              Về chúng tôi
            </h2>
            <ul className="font-medium text-gray-500">
              <li className="mb-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61569935183490"
                  target="_blank"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Giới thiệu
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>

              <li className="mb-4">
                <Link
                  href="/"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Bài viết
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Thông tin liên hệ
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-90 mb-6 text-sm font-semibold uppercase">
              Chăm sóc khách hàng
            </h2>
            <ul className="font-medium text-gray-500">
              <li className="mb-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61569935183490"
                  target="_blank"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Facebook
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>

              <li className="mb-4">
                <Link
                  href="/"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Liên hệ
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-90 mb-6 text-sm font-semibold uppercase">
              Chính sách bảo mật
            </h2>
            <ul className="font-medium text-gray-500">
              <li className="mb-4">
                <Link
                  href="/"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Bản quyền
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/"
                  className="group relative cursor-pointer hover:text-primary"
                >
                  Điều khoản &amp; Điều kiện
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.557603603402!2d106.6957963!3d10.7685382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3e407587a1%3A0x9f3e2f5b469e6de7!2zVHLGsOG7nW5nIFRIUFQgRXJuc3QgVGjDpGxtYW5u!5e0!3m2!1svi!2s!4v1732890670248!5m2!1svi!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[190px] w-[190px] border-none"
            />
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="https://www.facebook.com/profile.php?id=61569935183490">
              GreenFuture™
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
            <a
              href="https://www.facebook.com/profile.php?id=61569935183490"
              target="_blank"
              className="text-gray-400 hover:text-primary"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="https://greenfuture.vercel.app/"
              target="_blank"
              className="text-gray-400 hover:text-primary"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
