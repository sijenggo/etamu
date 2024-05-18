import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coworking from "./js/Coworking";
import Pojokbaca from "./js/Pojokbaca";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ='/coworking' element={<Coworking />} />
        <Route exact path ='/pojokbaca' element={<Pojokbaca />} />
      </Routes>
    </Router>
  );
}

export default App;
