"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type AuthActionResult = {
  ok: boolean;
  message?: string;
};

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

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to process the auth request.";
}

export async function signUpAction(
  formData: FormData,
): Promise<void> {
  const name = readString(formData, "name");
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const redirectTo = readRedirectTo(formData, DEFAULT_SIGN_IN_REDIRECT);

  if (!name || !email || !password) {
    redirect("/singup?error=what?");
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        rememberMe: readBoolean(formData, "rememberMe"),
      },
      headers: await headers(),
    });
  } catch{
    redirect("/signup?error=invalid")
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signInAction(formData: FormData): Promise<void> {
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const redirectTo = readRedirectTo(formData, DEFAULT_SIGN_IN_REDIRECT);

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: readBoolean(formData, "rememberMe"),
      },
      headers: await headers(),
    });
  } catch {
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