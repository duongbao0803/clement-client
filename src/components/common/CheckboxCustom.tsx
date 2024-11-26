import { Radio } from "antd";
import React from "react";
import { RadioChangeEvent } from "antd/lib/radio";

interface RadioCustomProps {
  className?: string;
  title?: string;
  checked?: boolean;
  onChange?: (e: RadioChangeEvent) => void;
}

const RadioCustom: React.FC<RadioCustomProps> = (props) => {
  const { className, title, checked, onChange } = props;

  return (
    <Radio
      className={`custom-radio ${className}`}
      checked={checked}
      onChange={onChange}
    >
      {title}
    </Radio>
  );
};

export default RadioCustom;
