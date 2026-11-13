"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { useLogoutFromDbMutation } from "@/redux/fetchers/auth/authApi"
import { logout } from "@/redux/fetchers/auth/authSlice"
import { baseApi } from "@/redux/api/baseApi"
import type { AppDispatch } from "@/redux/store"

export function useLogout(redirectTo: string = "/") {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [logoutFromDb] = useLogoutFromDbMutation()

  return async function handleLogout() {
    try {
      await logoutFromDb(undefined).unwrap()
    } catch {
      // Cookie clear can fail silently (e.g. offline) — client state still clears below.
    }
    dispatch(logout())
    dispatch(baseApi.util.resetApiState())
    toast.success("Logged out successfully")
    router.replace(redirectTo)
  }
}
