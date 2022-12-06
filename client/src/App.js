import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
// import CreateActivity from "./pages/CreateActivity";
// import DetailCountry from "./pages/DetailCountry";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      {/* <Route path="/createActivity" component={CreateActivity} />
      <Route path="/detail/:id" component={DetailCountry} /> */}
    </BrowserRouter>
  );
}

export default App;
