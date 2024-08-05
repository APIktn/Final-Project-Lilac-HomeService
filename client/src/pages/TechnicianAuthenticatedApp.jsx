import { Routes, Route, Navigate } from "react-router-dom";
import HomePage_technician from "./HomePage_technician";
import NotFoundPage from "./NotFoundPage";
import TechInfo from "./TechInfo";
import TechInprogress from "./TechInprogress";
import TechCompleted from "./TechCompleted";

function TechnicianAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/technician" element={<HomePage_technician />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/techinfo" element={<TechInfo />} />
        <Route path="/techinprogress" element={<TechInprogress />} />
        <Route path="/techcompleted" element={<TechCompleted />} />
        <Route path="/" element={<Navigate to="/technician" replace />} />
        <Route path="/login" element={<Navigate to="/technician" replace />} />
        <Route
          path="/register"
          element={<Navigate to="/technician" replace />}
        />
      </Routes>
    </div>
  );
}

export default TechnicianAuthenticatedApp;
