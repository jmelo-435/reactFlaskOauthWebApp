import React from "react";
import './auth/view/auth/Auth.css'
import AuthMainContent from "./auth/view/auth/AuthMainContent";
import MainDashboardBody from "./auth/view/stocks_list/MainDashboardBody";
import TopBanner from "./auth/view/auth/TopBanner";
import BottomBanner from "./auth/view/auth/BottomBanner"

const App =() =>{
  return(
    <div className="app">
    <MainDashboardBody/>
    </div>
        );
}

export default App;