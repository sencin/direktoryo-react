import { useEffect, useState } from "react";
import { api } from "./api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    api.get("/users/me")
      .then(res => {
        const user = res?.user ?? res?.data?.user;
        setIsAuthenticated(!!user?.id);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
}