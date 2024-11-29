"use client";

import CountUp from "react-countup";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { MdFavorite, MdProductionQuantityLimits } from "react-icons/md";
import product1 from "@/assets/images/products/pic6.png";
import product2 from "@/assets/images/products/pic3.png";
import product3 from "@/assets/images/products/pic4.png";
import product4 from "@/assets/images/products/pic5.png";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const Statistical = () => {
  const stats = [
    {
      id: 1,
      value: <CountUp end={500} duration={3} delay={2.2} />,
      label: "SẢN PHẨM",
      icon: <MdProductionQuantityLimits />,
    },
    {
      id: 2,
      value: <CountUp end={1500} duration={3} delay={2.2} />,
      label: "KHÁCH HÀNG",
      icon: <FaUser />,
    },
    {
      id: 3,
      value: <CountUp end={250} duration={3} delay={2.2} />,
      label: "ĐỐI TÁC",
      icon: <FaPeopleGroup />,
    },
    {
      id: 4,
      value: <CountUp end={1900} duration={3} delay={2.2} />,
      label: "HẢI LÒNG",
      icon: <MdFavorite />,
    },
  ];
  return (
    <section className="my-32">
      <div className="relative grid h-full max-h-[992px] place-items-center overflow-hidden bg-cover bg-center lg:h-[350px]">
        <div className="absolute inset-0 bg-black opacity-30" />
        <ScrollReveal>
          <div className="flex h-full flex-wrap">
            <div className="group relative h-full w-[25%] overflow-hidden">
              <div className="backgroundColor absolute z-[10] h-[400px] w-full group-hover:bg-opacity-80" />
              <div className="absolute left-1/2 top-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 transform text-center">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Image
                    src={
                      "https://freebw.com/templates/oragnive-v1/images/icons/symbol-03.png"
                    }
                    height={1000}
                    width={1000}
                    quality={100}
                    alt="product1"
                    className="h-full w-[55px] transition-all duration-500 group-hover:scale-110"
                  />
                  <h1 className="text-3xl font-semibold text-white transition-all duration-500 group-hover:tracking-[0.2em]">
                    RAU CỦ
                  </h1>
                </div>
              </div>

              <div className="h-[350px] bg-white">
                <Image
                  src={
                    "https://freebw.com/templates/oragnive-v1/images/bg-item-01.jpg"
                  }
                  height={1000}
                  width={1000}
                  quality={100}
                  alt="product1"
                  className="h-full transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="group relative h-full w-[25%] overflow-hidden">
              <div className="backgroundColor absolute z-[10] h-[400px] w-full group-hover:bg-opacity-80" />
              <div className="absolute left-1/2 top-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 transform text-center">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Image
                    src={
                      "https://freebw.com/templates/oragnive-v1/images/icons/symbol-04.png"
                    }
                    height={1000}
                    width={1000}
                    quality={100}
                    alt="product1"
                    className="h-full w-[55px] transition-all duration-500 group-hover:scale-110"
                  />
                  <h1 className="text-3xl font-semibold text-white transition-all duration-500 group-hover:tracking-[0.2em]">
                    TRÁI CÂY
                  </h1>
                </div>
              </div>

              <div className="h-[350px] bg-white">
                <Image
                  src={
                    "https://freebw.com/templates/oragnive-v1/images/bg-item-02.jpg"
                  }
                  height={1000}
                  width={1000}
                  quality={100}
                  alt="product1"
                  className="h-full transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="group relative h-full w-[25%] overflow-hidden">
              <div className="backgroundColor absolute z-[10] h-[400px] w-full group-hover:bg-opacity-80" />
              <div className="absolute left-1/2 top-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 transform text-center">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Image
                    src={
                      "https://freebw.com/templates/oragnive-v1/images/icons/symbol-05.png"
                    }
                    height={1000}
                    width={1000}
                    quality={100}
                    alt="product1"
                    className="h-full w-[55px] transition-all duration-500 group-hover:scale-110"
                  />
                  <h1 className="text-3xl font-semibold text-white transition-all duration-500 group-hover:tracking-[0.2em]">
                    ĐỒ UỐNG
                  </h1>
                </div>
              </div>

              <div className="h-[350px] bg-white">
                <Image
                  src={
                    "https://freebw.com/templates/oragnive-v1/images/bg-item-03.jpg"
                  }
                  height={1000}
                  width={1000}
                  quality={100}
                  alt="product1"
                  className="h-full transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="group relative h-full w-[25%] overflow-hidden">
              <div className="backgroundColor absolute z-[10] h-[400px] w-full group-hover:bg-opacity-80" />
              <div className="absolute left-1/2 top-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 transform text-center">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Image
                    src={
                      "https://freebw.com/templates/oragnive-v1/images/icons/symbol-06.png"
                    }
                    height={1000}
                    width={1000}
                    quality={100}
                    alt="product1"
                    className="h-full w-[45px] transition-all duration-500 group-hover:scale-110"
                  />
                  <h1 className="text-3xl font-semibold text-white transition-all duration-500 group-hover:tracking-[0.2em]">
                    ĐỒ KHÔ
                  </h1>
                </div>
              </div>

              <div className="h-[350px] bg-white">
                <Image
                  src={
                    "https://freebw.com/templates/oragnive-v1/images/bg-item-04.jpg"
                  }
                  height={1000}
                  width={1000}
                  quality={100}
                  alt="product1"
                  className="h-full transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Statistical;
