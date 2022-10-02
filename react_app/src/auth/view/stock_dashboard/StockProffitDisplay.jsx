import "./StockProffitDisplay.css"
const StockProffitDisplay=({profit})=>{
    return(
        <div className="stockProffitDisplay">
        <h6>{String({profit})}</h6>
        </div>
        
    )
    }
    
    export default StockProffitDisplay