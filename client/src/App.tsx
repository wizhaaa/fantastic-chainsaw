import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "./Dashboard";
import { Home } from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
