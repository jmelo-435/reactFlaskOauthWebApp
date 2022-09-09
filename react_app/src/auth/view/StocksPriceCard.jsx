import './StockPriceCard.css'
import VariationDisplay from './VariationDisplay'
const StockPriceCard = ({ stock, id }) => {
    return (
        <div className="stockPriceCard" id={id}>
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

                <span><h3>Semana</h3><h3>Mês</h3><h3>Ano</h3></span>
                <span>
                    <VariationDisplay variation={stock.weekVariation} />
                    <VariationDisplay variation={stock.monthVariation} />
                    <VariationDisplay variation={stock.yearVariation} /></span>
            </div>
        </div>
    )
}

export default StockPriceCard