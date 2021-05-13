import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "../../providers/UserProfileProvider";
import ApplicationViews from "../../views/ApplicationViews";
import "./App.css";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
