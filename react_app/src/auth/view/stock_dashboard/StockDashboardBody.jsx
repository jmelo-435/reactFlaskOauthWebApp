import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import {stockProffitDisplay}from "./StockProffitDisplay.jsx"

const StockDashboardBody = ({ stockData }) => {
    const keys = Object.keys(stockData.proffits)
    return (
        <div className="stockDashboardBody">
            <div className="item stockHeader">
                <img src={"/api_res/stocks/image/" + stockData.id}></img>
                <div className="headerDetails">
                    <h1>{stockData.id}</h1>
                    <h2>{stockData.stockName}</h2>
                    <h3>{stockData.setor}</h3>
                    {keys.map((profit) => <stockProffitDisplay profit={profit}/>)}

                </div>
            </div>
            <div className="item profitBar">
            {keys.map((profit) => <stockProffitDisplay profit={profit}/>)}
            </div>
            <div className="item footer"></div>
        </div>
    );

}

export default StockDashboardBody;