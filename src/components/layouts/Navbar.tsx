"use client";

import User from "@/assets/images/logo/avatar_admin.jpg";
import IconWeb from "@/assets/images/logo/logo_web.png";
import { VoiceSearch } from "@/components";
import { RolesLogin } from "@/enums";
import useDebounce from "@/hooks/useDebounce";
import { useLogout } from "@/hooks/useLogout";
import useUserSelector from "@/redux/hooks/useUserSelector";
import { RootState } from "@/redux/store";
import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Dropdown, Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCircleQuestion, FaRegPaperPlane } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import NavElement from "./NavElement";

const Navbar = () => {
  const { userInfo } = useUserSelector();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [styleCart, setStyleCart] = useState<string>("");
  const [styleFavor, setStyleFavor] = useState<string>("");
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const count = useSelector(
    (state: RootState) => state.persistedReducer.favorites.count,
  );

  const currentPath = usePathname();

  useEffect(() => {
    const isCart =
      currentPath.includes("/cart") || currentPath.includes("/checkout");
    const isFavorite = currentPath.includes("/favorite");

    setStyleCart(isCart ? "text-primary" : "");
    setStyleFavor(isFavorite ? "text-primary" : "");
  }, [currentPath]);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const menuItems = useMemo<MenuProps>(
    () => ({
      items: [
        {
          key: "profile",
          label: (
            <Link href="/user/personal" className="flex items-center gap-2">
              <span>Thông tin cá nhân</span>
            </Link>
          ),
        },
        {
          key: "logout",
          label: (
            <p className="w-full" onClick={logout}>
              Đăng xuất
            </p>
          ),
        },
      ],
    }),
    [logout],
  );

  const linkData = useMemo(
    () => [
      {
        href: "",
        text: "Thông báo",
        icon: (
          <BellOutlined className="text-sm transition-all duration-500 lg:text-lg" />
        ),
      },
      {
        href: "https://www.facebook.com/Fricks.BuildingService",
        text: "Hỗ trợ",
        icon: (
          <FaRegCircleQuestion className="text-sm transition-all duration-500 lg:text-lg" />
        ),
        target: "_blank",
      },
    ],
    [],
  );

  return (
    <header>
      <div className="flex flex-col items-center justify-center bg-[#fff] transition-all duration-500">
        <div className="w-full bg-[#F5F5F5] py-2">
          <div className="max-513-center container mx-auto flex w-full flex-wrap items-center justify-between gap-2 transition-all duration-500">
            <div className="mr-2 flex flex-wrap items-center gap-1 text-[11px] lg:text-[16px]">
              <FaRegPaperPlane className="text-sm transition-all duration-500 lg:text-lg" />
              <span>fricks.customerservice@gmail.com</span>
            </div>
            <div className="ml-2 flex items-center gap-5">
              {linkData.map((link, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    target={link.target}
                    className="flex cursor-pointer items-center gap-1 hover:text-primary"
                  >
                    {link.icon}
                    <span className="text-[11px] transition-all duration-500 lg:text-sm">
                      {link.text}
                    </span>
                  </Link>
                  {index < linkData.length - 1 && (
                    <div className="h-6 w-0.5 bg-orange-600" />
                  )}
                </div>
              ))}
              <div className="h-6 w-0.5 bg-orange-600" />
              {userInfo ? (
                <Dropdown
                  menu={menuItems}
                  trigger={["hover"]}
                  placement="bottomRight"
                  arrow
                >
                  <div className="flex cursor-pointer items-center gap-1 hover:text-primary">
                    <Image
                      src={userInfo?.avatar || User}
                      alt={userInfo?.fullName}
                      width={30}
                      height={30}
                      className="size-7 rounded-full object-cover"
                    />
                    <span className="text-[11px] transition-all duration-500 lg:text-sm">
                      {userInfo?.fullName}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <Link
                  href="/auth"
                  className="flex cursor-pointer items-center gap-1 hover:text-primary"
                >
                  <FaRegUserCircle className="text-sm transition-all duration-500 lg:text-lg" />
                  <span className="text-[11px] transition-all duration-500 lg:text-sm">
                    Đăng nhập
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto flex items-center justify-between bg-[#fff] py-4 transition-all duration-500 lg:py-5">
          <Link href="/">
            <Image
              src={IconWeb}
              width={130}
              alt="icon"
              quality={100}
              className="hidden lg:block"
            />
            <Image
              src={IconWeb}
              width={150}
              alt="icon"
              quality={100}
              className="lg:hidden"
            />
          </Link>
          {/* <span className="yt-icon-shape style-scope yt-icon yt-spec-icon-shape">
            <div className="w-[200px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="yt-logo-red-updated-svg_yt71"
                className="external-icon w-[150px] cursor-pointer"
                viewBox="0 0 97 20"
                // style="width: 100%; pointer-events: none; display: inherit; height: 100%;"
                focusable="false"
                aria-hidden="true"
              >
                <svg
                  id="yt-logo-red-updated_yt71"
                  viewBox="0 0 97 20"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M27.9704 3.12324C27.6411 1.89323 26.6745 0.926623 25.4445 0.597366C23.2173 2.24288e-07 14.2827 0 14.2827 0C14.2827 0 5.34807 2.24288e-07 3.12088 0.597366C1.89323 0.926623 0.924271 1.89323 0.595014 3.12324C-2.8036e-07 5.35042 0 10 0 10C0 10 -1.57002e-06 14.6496 0.597364 16.8768C0.926621 18.1068 1.89323 19.0734 3.12324 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6769 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9704 3.12324Z"
                      fill="#ff7b29"
                    ></path>
                    <path
                      d="M11.4275 14.2854L18.8475 10.0004L11.4275 5.71533V14.2854Z"
                      fill="white"
                    ></path>
                  </g>
                  <g id="youtube-red-paths_yt71">
                    <path d="M40.0566 6.34524V7.03668C40.0566 10.4915 38.5255 12.5118 35.1742 12.5118H34.6638V18.5583H31.9263V1.42285H35.414C38.6078 1.42285 40.0566 2.7728 40.0566 6.34524ZM37.1779 6.59218C37.1779 4.09924 36.7287 3.50658 35.1765 3.50658H34.6662V10.4727H35.1365C36.6064 10.4727 37.1803 9.40968 37.1803 7.10253L37.1779 6.59218Z"></path>
                    <path d="M46.5336 5.8345L46.3901 9.08238C45.2259 8.83779 44.264 9.02123 43.836 9.77382V18.5579H41.1196V6.0391H43.2857L43.5303 8.75312H43.6337C43.9183 6.77288 44.8379 5.771 46.0232 5.771C46.1949 5.7757 46.3666 5.79687 46.5336 5.8345Z"></path>
                    <path d="M49.6567 13.2456V13.8782C49.6567 16.0842 49.779 16.8415 50.7198 16.8415C51.6182 16.8415 51.8228 16.1501 51.8439 14.7178L54.2734 14.8613C54.4568 17.5565 53.0481 18.763 50.6586 18.763C47.7588 18.763 46.9004 16.8627 46.9004 13.4126V11.223C46.9004 7.58707 47.8599 5.80908 50.7409 5.80908C53.6407 5.80908 54.3769 7.32131 54.3769 11.0984V13.2456H49.6567ZM49.6567 10.6703V11.5687H51.7193V10.675C51.7193 8.37258 51.5547 7.71172 50.6821 7.71172C49.8096 7.71172 49.6567 8.38669 49.6567 10.675V10.6703Z"></path>
                    <path d="M68.4103 9.09902V18.5557H65.5928V9.30834C65.5928 8.28764 65.327 7.77729 64.7132 7.77729C64.2216 7.77729 63.7724 8.06186 63.4667 8.59338C63.4832 8.76271 63.4902 8.93439 63.4879 9.10373V18.5605H60.668V9.30834C60.668 8.28764 60.4022 7.77729 59.7884 7.77729C59.2969 7.77729 58.8665 8.06186 58.5631 8.57456V18.5628H55.7456V6.03929H57.9728L58.2221 7.63383H58.2621C58.8947 6.42969 59.9178 5.77588 61.1219 5.77588C62.3072 5.77588 62.9799 6.36854 63.288 7.43157C63.9418 6.34973 64.9225 5.77588 66.0443 5.77588C67.7564 5.77588 68.4103 7.00119 68.4103 9.09902Z"></path>
                    <path d="M69.8191 2.8338C69.8191 1.4862 70.3106 1.09814 71.3501 1.09814C72.4132 1.09814 72.8812 1.54734 72.8812 2.8338C72.8812 4.22373 72.4108 4.57181 71.3501 4.57181C70.3106 4.56945 69.8191 4.22138 69.8191 2.8338ZM69.9837 6.03935H72.6789V18.5629H69.9837V6.03935Z"></path>
                    <path d="M81.891 6.03955V18.5631H79.6849L79.4403 17.032H79.3792C78.7466 18.2573 77.827 18.7677 76.684 18.7677C75.0095 18.7677 74.2522 17.7046 74.2522 15.3975V6.0419H77.0697V15.2352C77.0697 16.3382 77.3002 16.7874 77.867 16.7874C78.3844 16.7663 78.8477 16.4582 79.0688 15.9902V6.0419H81.891V6.03955Z"></path>
                    <path d="M96.1901 9.09893V18.5557H93.3726V9.30825C93.3726 8.28755 93.1068 7.7772 92.493 7.7772C92.0015 7.7772 91.5523 8.06177 91.2465 8.59329C91.263 8.76027 91.2701 8.9296 91.2677 9.09893V18.5557H88.4502V9.30825C88.4502 8.28755 88.1845 7.7772 87.5706 7.7772C87.0791 7.7772 86.6487 8.06177 86.3453 8.57447V18.5627H83.5278V6.0392H85.7527L85.9973 7.63139H86.0372C86.6699 6.42725 87.6929 5.77344 88.8971 5.77344C90.0824 5.77344 90.755 6.3661 91.0631 7.42913C91.7169 6.34729 92.6976 5.77344 93.8194 5.77344C95.541 5.77579 96.1901 7.0011 96.1901 9.09893Z"></path>
                    <path d="M40.0566 6.34524V7.03668C40.0566 10.4915 38.5255 12.5118 35.1742 12.5118H34.6638V18.5583H31.9263V1.42285H35.414C38.6078 1.42285 40.0566 2.7728 40.0566 6.34524ZM37.1779 6.59218C37.1779 4.09924 36.7287 3.50658 35.1765 3.50658H34.6662V10.4727H35.1365C36.6064 10.4727 37.1803 9.40968 37.1803 7.10253L37.1779 6.59218Z"></path>
                  </g>
                </svg>
              </svg>
            </div>
          </span> */}
          <div className="hidden items-center gap-8 lg:flex">
            <NavElement />
          </div>
          <div className="mx-6 flex w-full items-center gap-3 lg:mx-0 lg:w-auto">
            <div className="relative flex w-full items-center gap-2 transition-all duration-500 lg:flex">
              <VoiceSearch onSearch={handleSearchUpdate} />
              <Form name="normal_login" className="login-form w-full">
                <Form.Item
                  name=""
                  hasFeedback
                  colon={true}
                  className="formItem"
                  noStyle
                >
                  <input
                    value={debouncedSearchQuery}
                    placeholder="Tìm kiếm..."
                    type="text"
                    className="w-full rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </div>
            {userInfo && userInfo?.role?.includes(RolesLogin.CUSTOMER) && (
              <div className="flex items-center gap-5">
                <Link href="/favorite">
                  <div className="lg:block">
                    <Badge count={count}>
                      <GrFavorite
                        className={`cursor-pointer text-2xl ${styleFavor} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
                <Link href="/cart">
                  <div className="lg:block">
                    <Badge count={cartData?.totalQuantity}>
                      <ShoppingCartOutlined
                        className={`cursor-pointer text-2xl ${styleCart} hover:text-primary`}
                      />
                    </Badge>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
