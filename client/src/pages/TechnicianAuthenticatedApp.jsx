import { Routes, Route } from "react-router-dom";
import HomePage_technician from "./HomePage_technician";
import NotFoundPage from "./NotFoundPage";

function TechnicianAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/technician" element={<HomePage_technician />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default TechnicianAuthenticatedApp;
