"use client"

import type { ReactNode } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// Google's gsi/client script is only needed on auth pages, so the provider
// lives here instead of the root layout (keeps it off the home/shop pages).
export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>
}
