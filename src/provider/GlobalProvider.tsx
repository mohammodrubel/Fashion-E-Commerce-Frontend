"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface GlobalProviderProps {
  children: ReactNode;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

/**
 * Redux persist auto-rehydrates in the background via `persistStore(store)`
 * (called in redux/store). Wrapping children in <PersistGate loading={null}>
 * would render a blank tree until rehydration completes, causing the
 * intermittent white-screen flashes on the home page. We drop the gate and
 * let components render immediately with default state; rehydration updates
 * them a tick later.
 */
export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Toaster position="top-center" visibleToasts={1} richColors />
        {children}
      </Provider>
    </GoogleOAuthProvider>
  );
}