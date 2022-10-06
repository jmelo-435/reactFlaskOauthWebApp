import { getStocksList, getStocksListDaysAgo,getStockData } from '../repo/resRepo'

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

export async function returnSelectedStockData(id){
 const data = await getStockData(id)
 const selectedStockData = {
    id:"",
    name:"",
    price:null,
    relevance:null,
    setor:null,
    proffits:{},
    monthVariation:null,
    weekVariation:null,
    yearVariation: null
 }
 function returnLucrosObject(data){
    const lucros = {}
    let year = 1990
    while (year<2060){
        const strYear= String(year)
        const receivedLucro = data?.[strYear]?.["Lucro líquido"]
        console.log(receivedLucro)

        if (receivedLucro!=null){
            lucros.strYear = receivedLucro
        } 
        year = year+1
    }
    return lucros
 }
 selectedStockData.id=data.data._id
 selectedStockData.name=data.data.name ?? null
 selectedStockData.price = data.data.realtime.value
 selectedStockData.setor=data.data.setor
 selectedStockData.relevance = data.relevance ?? null
 selectedStockData.proffits = returnLucrosObject(data)
 return selectedStockData
}