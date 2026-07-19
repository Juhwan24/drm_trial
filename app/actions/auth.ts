"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAPIError } from "better-auth/api";
import { auth } from "@/lib/auth";

const DEFAULT_SIGN_IN_REDIRECT = "/webtoon";
const DEFAULT_SIGN_OUT_REDIRECT = "/";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readBoolean(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

function readRedirectTo(formData: FormData, fallback: string) {
  const redirectTo = readString(formData, "redirectTo");
  return redirectTo.startsWith("/") ? redirectTo : fallback;
}

export async function signUpAction(formData: FormData) {
  const name = readString(formData, "name");
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const redirectTo = readRedirectTo(
    formData,
    DEFAULT_SIGN_IN_REDIRECT,
  );

  if (!name || !email || !password) {
    redirect("/signup?error=missing");
  }

  let failed = false;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });
  } catch (error) {
    failed = true;

    if (isAPIError(error)) {
      console.error("회원가입 실패:", {
        message: error.message,
        status: error.status,
      });
    } else {
      console.error("회원가입 알 수 없는 오류:", error);
    }
  }

  if (failed) {
    redirect("/signup?error=invalid");
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signInAction(formData: FormData) {
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const redirectTo = readRedirectTo(
    formData,
    DEFAULT_SIGN_IN_REDIRECT,
  );

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  let failed = false;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: readBoolean(formData, "rememberMe"),
      },
      headers: await headers(),
    });
  } catch (error) {
    failed = true;

    if (isAPIError(error)) {
      console.error("로그인 실패:", {
        message: error.message,
        status: error.status,
      });
    } else {
      console.error("로그인 알 수 없는 오류:", error);
    }
  }

  if (failed) {
    redirect("/login?error=invalid");
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signOutAction(formData?: FormData) {
  const redirectTo = formData
    ? readRedirectTo(formData, DEFAULT_SIGN_OUT_REDIRECT)
    : DEFAULT_SIGN_OUT_REDIRECT;

  await auth.api.signOut({
    headers: await headers(),
  });

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}