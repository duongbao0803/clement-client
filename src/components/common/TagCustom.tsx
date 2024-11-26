import React from "react";
import { Tag } from "antd";

interface TagCustomProps {
  label: string;
  color?: string;
  closable?: boolean;
  className?: string;
}

const TagCustom: React.FC<TagCustomProps> = ({
  label,
  color = "blue",
  closable = true,
  className,
}) => {
  return (
    <Tag color={color} closable={closable} className={className}>
      {label}
    </Tag>
  );
};

export default TagCustom;
