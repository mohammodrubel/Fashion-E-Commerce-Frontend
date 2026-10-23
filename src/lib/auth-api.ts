const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    access_token: string
  }
}

export class AuthApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = "AuthApiError"
  }
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    credentials: "include",
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new AuthApiError(
      res.status,
      (json as { message?: string })?.message ?? "An unexpected error occurred."
    )
  }

  return json as T
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...payload, role: "USER" }),
  })
}
