import React from "react";
import './auth/view/Auth.css'
import MainContent from "./auth/view/MainContent";
import TopBanner from "./auth/view/TopBanner";
import BottomBanner from "./auth/view/BottomBanner"

const App =() =>{
  return(
    <div className="app">
    <TopBanner/>
    <MainContent/>
    <BottomBanner/>
    </div>
        );
}

export default App;