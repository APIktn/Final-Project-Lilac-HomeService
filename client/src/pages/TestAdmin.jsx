import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../contexts/adminAuthentication";
import axios from "axios";

function TestAdmin() {
  const { logout } = useAdminAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/getdata`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>This is the dashboard page for admin</div>
      <div>
        <a href="/">Home</a>
      </div>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <div>
        {data ? (
          <div>
            <h2>Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default TestAdmin;
