"use client";
import { Spin } from "antd";
import React, { useState } from "react";

const Map = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };
  return (
    <div className="mb-3">
      {!isIframeLoaded && (
        <div className="flex h-[500px] w-full items-center justify-center border border-gray-300">
          <Spin size="large" tip="Đang chờ" />
        </div>
      )}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530492!2d106.80730807486965!3d10.84113285799728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1718182126450!5m2!1sen!2s"
        loading="lazy"
        width="100%"
        height="400"
        allowFullScreen={true}
        className="h-[500px] w-full border-0"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

export default Map;
