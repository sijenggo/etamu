import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coworking from "./js/Coworking";
import Pojokbaca from "./js/Pojokbaca";
import Repel from "./js/Repel";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ='/coworking' element={<Coworking />} />
        <Route exact path ='/pojokbaca' element={<Pojokbaca />} />
        <Route exact path ='/repel' element={<Repel />} />
      </Routes>
    </Router>
  );
}

export default App;
