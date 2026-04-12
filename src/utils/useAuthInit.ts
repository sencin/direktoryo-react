import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { auth } from "../utils/auth";

export function useAuthInit() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = auth.getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const me = await api.get("/users/me");

        if (!me || me.error) {
          auth.clear();
        }
      } catch (err) {
        auth.clear();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { loading };
}