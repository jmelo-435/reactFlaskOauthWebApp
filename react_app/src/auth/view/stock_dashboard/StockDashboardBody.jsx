import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import StockProffitDisplay from "./StockProffitDisplay.jsx"
import { useState, useEffect } from 'react'

const StockDashboardBody = ({ stockData }) => {
    const keys = Object.keys(stockData.proffits)
    const [profits,setProffits]=useState(keys)
    return (
        <div className="stockDashboardBody">
            <div className="item stockHeader">
                <img src={"/api_res/stocks/image/" + stockData.id}></img>
                <div className="headerDetails">
                    <h1>{stockData.id}</h1>
                    <h2>{stockData.stockName}</h2>
                    <h3>{stockData.setor}</h3>
                    {keys.map((profit) => <StockProffitDisplay profit={profit}/>)}

                </div>
            </div>
            <div className="item profitBar">
            {profits.map((profit) => <StockProffitDisplay profit={profit}/>)}
            </div>
            <div className="item footer"></div>
        </div>
    );

}

export default StockDashboardBody;