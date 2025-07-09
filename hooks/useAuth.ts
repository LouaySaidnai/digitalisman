import { useSession, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    signOut: () => signOut()
  };
}