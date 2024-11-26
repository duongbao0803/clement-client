"use client";
import React, { useState } from "react";
import { Slider } from "antd";

interface CustomSliderProps {
  min?: number;
  max?: number;
  initialValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  marks?: { [key: number]: string };
  className?: string;
}

const RadioCustom: React.FC<CustomSliderProps> = ({
  min,
  max,
  initialValue = [200000, 800000],
  onChange,
  marks,
  className,
}) => {
  const [value, setValue] = useState<[number, number]>(initialValue);

  const handleChange = (value: number[]) => {
    setValue([value[0], value[1]]);
    if (onChange) {
      onChange([value[0], value[1]]);
    }
  };

  const formatCurrency = (num: number): string => {
    return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
  };

  return (
    <div className="mt-2">
      <h3 className="text-center">
        Giá: {formatCurrency(value[0])} - {formatCurrency(value[1])}
      </h3>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        marks={marks}
        tipFormatter={(value) => formatCurrency(value || 0)}
        className={`custom-slider ${className}`}
      />
    </div>
  );
};

export default RadioCustom;
