import './StockPriceCard.css'
import VariationDisplay from './VariationDisplay'
const StockPriceCard = ({ stock, id, selectStock }) => {
   
    return (
        <div className="stockPriceCard" 
        onClick={(e) => selectStock(stock.id)} id={id}>
            <div className="topoCard">
                <div className="mainTopoDisplay">
                    <img src={"/api_res/stocks/image/" + stock.id}></img>
                    <h1>{stock.id}</h1>
                </div>
                <h4>{stock.name}</h4>
            </div>

            <div className="price">
                <h2>{stock.price}</h2>
                <h3>BRL</h3>
            </div>
            <div className="bottomCard">

                <span><h3>5Anos</h3><h3>10Anos</h3></span>
                <span>
                    
                    <VariationDisplay variation={stock.monthVariation} />
                    <VariationDisplay variation={stock.yearVariation} /></span>
            </div>
        </div>
    )
}

export default StockPriceCard