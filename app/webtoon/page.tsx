import { redirect } from "next/navigation";
import { getCurrentSession, signOutAction } from "@/app/actions/auth";
import DevtoolsGuard from "./DevtoolsGuard";
import WebToon from "./webtoon";

export default async function WebtoonPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
      </form>

      <DevtoolsGuard>
        <WebToon />
      </DevtoolsGuard>
    </div>
  );
}