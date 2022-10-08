import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import StockProffitDisplay from "./StockProffitDisplay.jsx"
import Chart from './Chart.jsx'


const StockDashboardBody = ({ stockData }) => {


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
            <Chart id= {stockData.id}/>
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