"use client";
import NextTopLoader from "nextjs-toploader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const secondaryColor = fullConfig.theme.colors.orange[600];

const NextProgressBar = () => {
  return (
    <NextTopLoader
      color={secondaryColor}
      initialPosition={0.08}
      crawlSpeed={10}
      height={4}
      crawl={false}
      showSpinner={false}
      easing="ease-in-out"
      speed={1000}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
    />
  );
};

export default NextProgressBar;
