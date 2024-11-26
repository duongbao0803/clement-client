// components/Tai1qImage.tsx
import Image, { StaticImageData } from "next/image";

interface ImageSliderProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
}

const ImageSliderCustom: React.FC<ImageSliderProps> = ({
  src,
  alt,
  className,
  width,
  height,
  quality,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className || "h-[650px] w-full object-center !rounded-xl"}
      width={width || 1000}
      height={height || 1000}
      quality={quality || 100}
    />
  );
};

export default ImageSliderCustom;
