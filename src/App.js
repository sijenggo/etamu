import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coworking from "./js/Coworking";

function App() {
  return (
    <Router basename='/'>
      <Routes>
        <Route exact path ='/coworking' element={<Coworking />} />
      </Routes>
    </Router>
  );
}

export default App;
