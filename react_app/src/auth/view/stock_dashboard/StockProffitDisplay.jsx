import "./StockProffitDisplay.css"
const StockProffitDisplay=({year,profit})=>{
    return(
        <div className="stockProffitDisplay">
        <h1>{year}</h1>
        <div className = {profit>0 ? "posProffitDisplay" : "negProffitDisplay"}>
            <span><h6>{profit}</h6></span>
        </div>
        </div>
        
    )
    }
    
    export default StockProffitDisplay