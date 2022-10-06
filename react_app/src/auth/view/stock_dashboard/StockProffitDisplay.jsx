import "./StockProffitDisplay.css"
const StockProffitDisplay=({year,profit})=>{
    profit = String(profit).replace(".","")
    return(
        <div className="stockProffitDisplay">
        <h1>{year}</h1>
        <div className = {parseInt(profit)>0 ? "posProffitDisplay" : "negProffitDisplay"}>
        <div className = {Math.sign(parseInt(profit))*parseInt(profit)>=1000 ? "bigProffitDisplay" : "smallProffitDisplay"}>
            {
            Math.sign(parseInt(profit))*parseInt(profit)>=1000?
            <span><h6>{Math.round(parseInt(profit)/1000)} bi</h6></span>
            :
            <span><h6>{profit}mi</h6></span>
            
            }
        </div>
        </div>
        </div>
        
    )
    }
    
    export default StockProffitDisplay