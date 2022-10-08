import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import StockProffitDisplay from "./StockProffitDisplay.jsx"
import { returnStockDashboardChartData } from '../../domain/mainDashboardFunctions'

import { useState, useEffect } from 'react'

const StockDashboardBody = ({ stockData }) => {
    const [data, setData] = useState()
    useEffect(() => {
        async function run(){
            const data = await returnStockDashboardChartData(stockData.id)
            console.log(data)
            setData(data)

        }
        run()
      }, []);

    return (
        <div className="stockDashboardBody">
            <div className="item stockHeader">
                <img src={"/api_res/stocks/image/" + stockData.id}></img>
                <div className="headerDetails">
                    <h1>{stockData.id}</h1>
                    <h2>{stockData.name}</h2>
                    <h3>{stockData.setor}</h3>

                </div>
            </div>
            <div className="item profitBar">
                <div className='proffitBarHeader'>
                    <h1>Lucro líquido anual:</h1>

                </div>
                {Object.entries(stockData.proffits).map(([key, value]) => 
    <StockProffitDisplay year={key} profit={value}/>
)}
            </div>
            <div className="item footer"></div>
        </div>
    );

}

export default StockDashboardBody;