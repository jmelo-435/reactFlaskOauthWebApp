import "./StockProffitDisplay.css"
const StockProffitDisplay=({year,profit})=>{
    return(
        <div className="stockProffitDisplay">
        <h6>{year}</h6>
        <h6>:</h6>
        <h6>{profit}</h6>
        </div>
        
    )
    }
    
    export default StockProffitDisplay