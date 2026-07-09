import Link from "next/link";

export default function Home() {
  return (
    <Link
      href="/webtoon"
      className="mx-auto w-[500px] h-[800px] bg-white flex items-center justify-center">
      <span className="block text-[30px] text-black">웹툰 보러 가기</span>
    </Link>
  );
}
