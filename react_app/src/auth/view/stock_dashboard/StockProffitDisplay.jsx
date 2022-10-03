import "./StockProffitDisplay.css"
const StockProffitDisplay=({year,profit})=>{
    return(
        <div className="stockProffitDisplay">
        <h1>{year}</h1>
        <h6>{profit}</h6>
        </div>
        
    )
    }
    
    export default StockProffitDisplay