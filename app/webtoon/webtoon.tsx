"use client";

import Image from "next/image";

export default function WebToon() {
  return (
    <div className="w-full h-[100%] bg-white flex flex-col flex-1 items-center justify-center">
      <Image
        className=""
        src="/image1.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
        unoptimized
      />
      <Image
        className=""
        src="/image2.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
        unoptimized
      />
      <Image
        className=""
        src="/image3.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
        unoptimized
      />
      <Image
        className=""
        src="/image4.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
        unoptimized
      />
      <Image
        className=""
        src="/image5.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
        unoptimized
      />
    </div>
  );
}
