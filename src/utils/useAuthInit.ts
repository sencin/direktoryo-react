import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { auth } from "../utils/auth";

export function useAuthInit() {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const token = auth.getToken();

        if (!token) {
          auth.clear();
          setIsValid(false);
          return;
        }

        const me = await api.get("/users/me");

        if (!me || me.error) {
          auth.clear();
          setIsValid(false);
        } else {
          auth.set(token, me.user);
          setIsValid(true);
        }
      } catch {
        auth.clear();
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { loading, isValid };
}