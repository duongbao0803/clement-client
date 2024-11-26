"use client";
import React from "react";

interface TransactionTabsProps {
  activeIndex: number;
  handleButtonClick: (index: number) => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({
  activeIndex,
  handleButtonClick,
}) => {
  const tabs = ["Tất cả", "Thành công", "Thất bại", "Đang chờ"];

  return (
    <div className="relative mx-auto mb-5 flex bg-[#fff] shadow-sm">
      {tabs.map((label, index) => (
        <button
          key={index}
          className={`relative w-[150px] py-2 transition-all duration-500 ${
            activeIndex === index ? "font-bold text-primary" : "text-gray-500"
          }`}
          onClick={() => handleButtonClick(index)}
        >
          {label}
        </button>
      ))}
      <div
        className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
        style={{ width: "150px", left: `${activeIndex * 150}px` }}
      />
    </div>
  );
};

export default TransactionTabs;
