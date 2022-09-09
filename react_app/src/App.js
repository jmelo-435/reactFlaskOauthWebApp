import React from "react";
import './auth/view/Auth.css'
import AuthMainContent from "./auth/view/AuthMainContent";
import MainDashboardBody from "./auth/view/MainDashboardBody";
import TopBanner from "./auth/view/TopBanner";
import BottomBanner from "./auth/view/BottomBanner"

const App =() =>{
  return(
    <div className="app">
    <MainDashboardBody/>
    </div>
        );
}

export default App;