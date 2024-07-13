import { Routes, Route } from "react-router-dom";
import HomePage_technician from "./HomePage_technician";
import NotFoundPage from "./NotFoundPage";
import PolicyPage from "./PolicyPage";
import TermsPage from "./TermsPage";

function TechnicianAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/technician" element={<HomePage_technician />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default TechnicianAuthenticatedApp;
