import "./StockProffitDisplay.css"
const StockProffitDisplay=({year,profit})=>{
    return(
        <div className="stockProffitDisplay">
        <h1>{year}</h1>
        <div className = {parseInt(profit)>0 ? "posProffitDisplay" : "negProffitDisplay"}>
        <div className = {Math.abs(parseInt(profit))>1000000000 ? "bigProffitDisplay" : "smallProffitDisplay"}>
            {
                Math.abs(parseInt(profit))>1000000000?
            <span><h6>{profit}bi</h6></span>
            :
            Math.abs(parseInt(profit))>1000000?
            <span><h6>{profit}mi</h6></span>
            :
            <span><h6>{profit}</h6></span>
            
            }
        </div>
        </div>
        </div>
        
    )
    }
    
    export default StockProffitDisplay