import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";

export const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { refreshAccessToken, signout } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchEmployee = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      const url = `${backendUrl}/api/employee/${id}`;

      const callFetch = (authToken) => {
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authToken,
          },
        });
      };

      let response = await callFetch(token);

      if (response.status === 401) {
        const data = await response.json();
        if (data.message === "TOKEN EXPIRED") {
          await refreshAccessToken(refreshToken);
          token = localStorage.getItem("access_token");
          response = await callFetch(token);
        } else {
          signout();
          return;
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        alert(
          `Falha ao buscar funcionário:\n` +
            `${errorText}`
        );
        setError(`HTTP ${response.status}`);
        return;
      }

      const data = await response.json();
      setEmployee(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, refreshAccessToken, signout]);

  useEffect(() => {
    fetchEmployee().then();
  }, [fetchEmployee]);

  return { employee, loading, error, refetch: fetchEmployee };
};
