import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";

export const useEmployees = ({ page = 0, size = 10, sort = 'id', direction = 'asc' } = {}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const { refreshAccessToken, signout } = useAuth();
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      const url = `${backendUrl}/api/employees?page=${page}&size=${size}&sort=${sort}&direction=${direction}`;

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
          `Falha ao buscar coletores:\n` +
            `Status ${response.status} ${response.statusText}\n` +
            `${errorText}`
        );
        setError(`HTTP ${response.status}`);
        return;
      }

      const data = await response.json();
      setEmployees(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, size, sort, direction, refreshAccessToken, signout]);

  useEffect(() => {
    fetchEmployees().then();
  }, [fetchEmployees]);

  return { employees, loading, error, totalPages, totalElements, refetch: fetchEmployees };
};
