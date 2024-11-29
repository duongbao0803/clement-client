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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.557603603402!2d106.6957963!3d10.7685382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3e407587a1%3A0x9f3e2f5b469e6de7!2zVHLGsOG7nW5nIFRIUFQgRXJuc3QgVGjDpGxtYW5u!5e0!3m2!1svi!2s!4v1732890670248!5m2!1svi!2s"
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
