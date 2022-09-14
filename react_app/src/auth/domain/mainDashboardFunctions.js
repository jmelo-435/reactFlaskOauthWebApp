import { getStocksList, getStocksListDaysAgo } from '../repo/resRepo'

function returnPercentage(price, laterPrice) {
    const variation = price / laterPrice
    if (variation >=1) {
        return "+" + ((variation - 1)*100).toFixed(2) + "%"
    }
    else {
        return "-" + ((1 - variation)*100).toFixed(2) + "%"
    }
}
export async function returnMainDashStocksInfoList() {

    const stocksDataList = []
    const stocksList = await getStocksList()
    stocksList.stocksList.map((stock) => {
        
        const stockData = {
            id: "",
            name: "",
            price: null,
            relevance:null,
            monthVariation: null,
            weekVariation: null,
            yearVariation: null
        }
        stockData.id = stock._id
        stockData.relevance = stock.relevance
        if('realtime' in stock){
            stockData.price = stock.realtime.value
        }
        stockData.name = stock.name
        stocksDataList.push(stockData)
    })

    const stocksListWeekAgo = await getStocksListDaysAgo(365)
    const stocksListMonthAgo = await getStocksListDaysAgo(365*5)
    const stocksListYearAgo = await getStocksListDaysAgo(365*10)
    stocksDataList.map((stockData) => {
        stocksListWeekAgo.stocksList.map((laterPrice) => {
            if (stockData.id === laterPrice._id) {
                stockData.weekVariation = returnPercentage(stockData.price, laterPrice.priceDaysAgo[0]?.adjClose)
            }
        })
        stocksListYearAgo.stocksList.map((laterPrice) => {
            if (stockData.id === laterPrice._id) {
                stockData.yearVariation = returnPercentage(stockData.price, laterPrice.priceDaysAgo[0]?.adjClose)

            }

        })
        stocksListMonthAgo.stocksList.map((laterPrice) => {
            if (stockData.id === laterPrice._id) {
                stockData.monthVariation = returnPercentage(stockData.price, laterPrice.priceDaysAgo[0]?.adjClose)

            }

        })

    })

    return stocksDataList

}