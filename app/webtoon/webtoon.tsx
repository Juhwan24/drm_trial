"use client";

import Image from "next/image";
import WatermarkOverlay from "./watermarkOverlay";

export default function WebToon() {
  return (
    <div className="w-full h-[100%] bg-white flex flex-col flex-1 items-center justify-center">
      <WatermarkOverlay  userId="user1"/> 
      <Image
        className=""
        src="/image1.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/image6.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/image3.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/image4.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/image5.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
    </div>
  );
}