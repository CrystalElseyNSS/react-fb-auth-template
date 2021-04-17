import React from "react";
import TabloidHomeLogo from "../images/TabloidHomeLogo.png";

export default function LoginRegister() {

  return (
    <>
      <main>
        <header className="masthead bg text-white text-center">
          <div className="container d-flex align-items-center flex-column">
            <img src={TabloidHomeLogo} alt=""/>
            <div className="divider-custom divider-light">
              <div className="divider-custom-line"></div>
              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
              <div className="divider-custom-line"></div>
            </div>
          </div>
        </header>
      </main>
    </>
  );
};