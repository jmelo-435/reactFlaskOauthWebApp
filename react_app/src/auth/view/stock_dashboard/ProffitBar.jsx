import "./StockProffitDisplay.css"
import StockProffitDisplay from "./StockProffitDisplay.jsx"


const ProffitBar = ({ stockData}) => {
    return(
        
        <div className="proffits">
            
            {Object.entries(stockData.proffits).reverse().map(([key, value]) => <StockProffitDisplay year={key} profit={value}/>)}
        </div>
    )

}

export default ProffitBar