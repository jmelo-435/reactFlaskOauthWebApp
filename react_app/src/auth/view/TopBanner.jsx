import { useState, useEffect } from "react"
import { testAuthApi } from "../repo/repo"
import { TestResponseCodes } from "../repo/ApiAuthResponseCodes"
const TopBanner = () =>{
    const [success, setSuccess]= useState(null)
    useEffect(
        ()=>{
            async function fetch(){
                const response = await testAuthApi()
                setSuccess(response.responseCode)
            }
            console.log(String(success))
            fetch();
            
        },[success]
    )
    return(
       
        <div className="topBanner">
            <h1>Fake Trade</h1>
        </div>
    )
}

export default TopBanner 