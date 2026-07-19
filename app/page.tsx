import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-#b4dcb9e6 items-center justify-between p-24">
      <button className="mx-auto w-[500px] h-[800px] bg-white flex items-center justify-center">
        <Link
          href="/webtoon"
          className="mx-auto w-[500px] h-[800px] bg-white flex items-center justify-center">
          <span className="block text-[30px] text-black">웹툰 보러 가기</span>
        </Link>
      </button>
    </main>
  );
}
