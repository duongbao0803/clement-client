import React from "react";
import { FiUser, FiLock, FiShoppingCart, FiLogOut } from "react-icons/fi";

interface ButtonData {
  id: number;
  label: string;
  path: string;
  icon: JSX.Element;
}

interface SidebarButtonsProps {
  activeButton: number;
  handleButtonClick: (id: number, path: string) => void;
  logout: () => void;
}

export const buttonsData: ButtonData[] = [
  {
    id: 1,
    label: "Thông tin cá nhân",
    path: "/user/personal",
    icon: <FiUser />,
  },
  { id: 2, label: "Đổi mật khẩu", path: "/user/password", icon: <FiLock /> },
  {
    id: 3,
    label: "Đơn hàng của tôi",
    path: "/user/ordered",
    icon: <FiShoppingCart />,
  },
  { id: 4, label: "Đăng xuất", path: "/logout", icon: <FiLogOut /> },
];

const SidebarButtons: React.FC<SidebarButtonsProps> = ({
  activeButton,
  handleButtonClick,
  logout,
}) => {
  return (
    <>
      {buttonsData.map((button, index) => (
        <button
          key={index}
          className={`mb-2 w-full rounded-lg px-3 py-2 text-left transition-all duration-200 ease-in-out ${
            activeButton === button.id
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
          onClick={() =>
            button.id === 4
              ? logout()
              : handleButtonClick(button.id, button.path)
          }
        >
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            {button.icon}
            <span>{button.label}</span>
          </div>
        </button>
      ))}
    </>
  );
};

export default React.memo(SidebarButtons);
