import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";

export const useCollector = (id) => {
  const [collector, setCollector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { refreshAccessToken, signout } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCollector = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      const url = `${backendUrl}/api/collector/${id}`;

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
          `Falha ao buscar coletor:\n` +
            `${errorText}`
        );
        setError(`HTTP ${response.status}`);
        return;
      }

      const data = await response.json();
      setCollector(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, refreshAccessToken, signout]);

  useEffect(() => {
    fetchCollector().then();
  }, [fetchCollector]);

  return { collector, loading, error, refetch: fetchCollector };
};
