import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import StockProffitDisplay from "./StockProffitDisplay.jsx"
import { useState, useEffect } from 'react'

const StockDashboardBody = ({ stockData }) => {

    return (
        <div className="stockDashboardBody">
            <div className="item stockHeader">
                <img src={"/api_res/stocks/image/" + stockData.id}></img>
                <div className="headerDetails">
                    <h1>{stockData.id}</h1>
                    <h2>{stockData.stockName}</h2>
                    <h3>{stockData.setor}</h3>

                </div>
            </div>
            <div className="item profitBar">
                {Object.entries(stockData.proffits).map(([key, value]) => 
    <StockProffitDisplay profit={key}/>
)}
            </div>
            <div className="item footer"></div>
        </div>
    );

}

export default StockDashboardBody;