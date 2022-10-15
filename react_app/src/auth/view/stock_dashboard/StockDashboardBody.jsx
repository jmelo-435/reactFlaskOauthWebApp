import '../auth/Auth.css'
import "./stockHeader.css"
import "./StockDashboardBody.css"
import ProffitBar from"./ProffitBar.jsx"
import Chart from './Chart.jsx'


const StockDashboardBody = ({ stockData,chartData }) => {


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
            <div className='item mainStats'>
            <Chart chartData= {chartData}/>

            </div>
            
            <div className="item profitBar">
            <h1>Lucro líquido anual:</h1>
           <ProffitBar stockData={stockData}></ProffitBar>
                
            </div>
            <div className="item footer"></div>
        </div>
    );

}

export default StockDashboardBody;