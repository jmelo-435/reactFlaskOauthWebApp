
const ProffitBar = ({ stockData}) => {
    return(
        
        <div>
            <h1>Lucro líquido anual:</h1>
            {Object.entries(stockData.proffits).reverse().map(([key, value]) => <StockProffitDisplay year={key} profit={value}/>)}
        </div>
    )

}

export default ProffitBar