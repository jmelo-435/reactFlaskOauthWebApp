import "./StockPriceCard.css"
const VariationDisplay=({variation})=>{
    return(
        <div className = {variation[0]==="+" ? "posVariationDisplay" : "negVariationDisplay"}>
            <span><h6>{variation}</h6></span>
        </div>
    )
    }
    
    export default VariationDisplay