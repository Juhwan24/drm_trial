import { signInAction } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form action={signInAction} className="flex flex-col gap-4 w-[320px]">
        <h1 className="text-2xl font-bold">로그인</h1>

        <input
          name="email"
          type="email"
          placeholder="이메일"
          className="border p-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          className="border p-2"
          required
        />

        <input type="hidden" name="redirectTo" value="/webtoon" />

        <button type="submit" className="bg-black text-white p-2">
          로그인
        </button>
      </form>
    </main>
  );
}