"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { persistor } from "@/redux/store"
import { useAuthToken } from "@/redux/fetchers/auth/authSlice"

/**
 * redux-persist rehydrates asynchronously and GlobalProvider skips
 * PersistGate (to avoid a blank-screen flash), so `token` reads null for a
 * tick on first load even for a logged-in user. Wait for persistor to
 * finish bootstrapping before deciding whether to redirect.
 */
export function useRequireAuth() {
  const token = useAuthToken()
  const router = useRouter()
  const [bootstrapped, setBootstrapped] = useState(
    () => persistor.getState().bootstrapped
  )

  useEffect(() => {
    if (bootstrapped) return
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setBootstrapped(true)
      }
    })
    return unsubscribe
  }, [bootstrapped])

  useEffect(() => {
    if (bootstrapped && !token) {
      router.replace("/login")
    }
  }, [bootstrapped, token, router])

  return { ready: bootstrapped && Boolean(token) }
}
