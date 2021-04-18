import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "../../providers/UserProfileProvider";
import ApplicationViews from '../../views/ApplicationViews';
import { UploadImgProvider } from "../../providers/UploadImgProvider";
import './App.css'

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <UploadImgProvider>
            <ApplicationViews />
        </UploadImgProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
