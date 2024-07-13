import React, { useEffect } from "react";
import { useAuth } from "./contexts/authentication";
import { useAdminAuth } from "./contexts/adminAuthentication";
import { useTechnicianAuth } from "./contexts/technicianAuthentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import AdminAuthenticatedApp from "./pages/AdminAuthenticatedApp";
import TechnicianAuthenticatedApp from "./pages/TechnicianAuthenticatedApp";

function App() {
  const { state: authState } = useAuth();
  const { state: adminState } = useAdminAuth();
  const { state: technicianState } = useTechnicianAuth();

  return (
    <div>
      {adminState.admin ? (
        <AdminAuthenticatedApp />
      ) : technicianState.technician ? (
        <TechnicianAuthenticatedApp />
      ) : authState.user ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
}

export default App;
