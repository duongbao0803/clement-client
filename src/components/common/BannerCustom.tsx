import React from "react";

const BannerCustom = ({ title }: { title: string }) => {
  return (
    <section>
      <div className="relative h-[50vh] max-h-[992px] min-h-[200px] w-full overflow-hidden bg-[url('https://citc.edu.vn/wp-content/uploads/2020/02/do-dat-trac-dia.png')] bg-cover bg-no-repeat transition-all duration-500 lg:min-h-[450px]">
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="container absolute inset-0 mx-auto flex items-center justify-center">
          <div className="my-5 flex flex-col items-center justify-center transition-all duration-500">
            <p className="mb-3 text-center text-2xl font-bold text-white md:text-3xl">
              Fricks
            </p>
            <h1 className="text-center text-3xl font-bold text-white md:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BannerCustom);
