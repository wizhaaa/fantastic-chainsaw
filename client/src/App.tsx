import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Home} from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nope" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
