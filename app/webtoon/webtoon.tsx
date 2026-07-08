"use client";

import Image from "next/image";

export default function WebToon() {
  return (
    <div className="w-full h-[100%] bg-white flex flex-col flex-1 items-center justify-center">
      <Image
        className=""
        src="/manga_long.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/manga_long2.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/manga_long3.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/manga_long4.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/manga_long5.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
      <Image
        className=""
        src="/manga_long6.png"
        alt="MANGA"
        width={500}
        height={20}
        priority
      />
    </div>
  );
}