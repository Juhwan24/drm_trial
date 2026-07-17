import { signUpAction } from "../actions/auth";
import Link from "next/link";

export default async function SignupPage() {
    return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <form
        action={signUpAction}
        className="w-[360px] flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-center">회원가입</h1>

        <input
          name="name"
          type="text"
          placeholder="이름"
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />

        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />

        <label className="flex items-center gap-2 text-sm">
          <input name="rememberMe" type="checkbox" />
          로그인 상태 유지
        </label>

        <input type="hidden" name="redirectTo" value="/webtoon" />

        <button
          type="submit"
          className="bg-black text-white rounded-md py-2 font-semibold"
        >
          회원가입
        </button>

        <p className="text-sm text-center text-gray-500">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="text-black underline">
            로그인
          </Link>
        </p>
      </form>
    </main>
    )
}