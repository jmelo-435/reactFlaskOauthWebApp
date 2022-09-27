import React, {useState} from "react";
import './Auth.css'
import AuthBody from "./AuthBody";
import SideBanner from "./SideBanner"
import CreateBody from "./CreateBody";
import ResendEmailBody from "./ResendEmailBody";
import PassResetBody from "./PassResetBody";
import centralEnum from "./CentralEnum"

const MainContent =() =>{
  const [centralContent,setCentralContent] = useState(centralEnum.login);
  
  
  return(
    <div className="main">
      {(()=>{
          if(centralContent===centralEnum.login){
            return(<AuthBody  setCentralContent = {setCentralContent} />)
          }
          if(centralContent===centralEnum.create){
            return(<CreateBody setCentralContent = {setCentralContent}/>)
          }
          if(centralContent===centralEnum.resend){
            return(<ResendEmailBody setCentralContent = {setCentralContent}/>)
          }
          if(centralContent===centralEnum.passReset){
            return(<PassResetBody setCentralContent = {setCentralContent}/>)
          }
        })()

        }
        

        <SideBanner/>
    </div>
        );
}

export default MainContent;