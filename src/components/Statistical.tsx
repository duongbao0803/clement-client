"use client";

import CountUp from "react-countup";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { MdFavorite, MdProductionQuantityLimits } from "react-icons/md";
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
      <div className="relative h-full max-h-[992px] overflow-hidden bg-[url('https://drh.vn/FileUpload/Images/bg15_1.jpg')] bg-cover bg-center lg:h-[400px]">
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="relative grid h-full grid-cols-1 items-center justify-around gap-y-10 p-5 px-4 text-white sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={index}>
              <div className="mb-4 flex flex-col items-center gap-2 md:mb-0">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary md:h-20 md:w-20 lg:h-28 lg:w-28">
                  <span className="text-4xl md:text-3xl lg:text-5xl">
                    {stat.icon}
                  </span>
                </div>
                <h3 className="mt-2 text-3xl font-bold md:text-5xl">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistical;
