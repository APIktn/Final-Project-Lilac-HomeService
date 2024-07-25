import { Routes, Route } from "react-router-dom";
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
      </Routes>
    </div>
  );
}

export default TechnicianAuthenticatedApp;
