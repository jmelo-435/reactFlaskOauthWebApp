import { getStocksList, getStocksListDaysAgo,getStockData,getStockChartData } from '../repo/resRepo'

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

        if (receivedLucro!=null){
            lucros[strYear] = receivedLucro
        } 
        year = year+1
    }
    const ordered = Object.keys(lucros).sort().reduce(
        (obj, key) => { 
          obj[key] = lucros[key]; 
          return obj;
        }, 
        {}
      );
      
    return ordered
 }
 selectedStockData.id=data.data._id
 selectedStockData.name=data.data.name ?? null
 selectedStockData.price = data.data.realtime.value
 selectedStockData.setor=data.data.setor
 selectedStockData.relevance = data.relevance ?? null
 selectedStockData.proffits = returnLucrosObject(data.data)
 return selectedStockData
}

export async function returnStockDashboardChartData(id){
    const priceData =await getStockChartData(id)
    const data = await getStockData(id)
    function returnLucrosObject(data){
        const lucros = []
        let year = 1990
        while (year<2060){
            
            const strYear= String(year)
            const date = new Date(strYear+'-01-01');

            const iso = date.toISOString();
            let receivedLucro = data?.[strYear]?.["Lucro líquido"]
            receivedLucro = String(receivedLucro).replace(".","")
    
            if (receivedLucro!=null){
                const lucro = {}
                lucro['date'] = iso
                lucro['lucro']=parseInt(receivedLucro)
                lucros.push(lucro)
            }
            
            year = year+1
        }
        return lucros
     }
     const lucrosList = returnLucrosObject(data.data)
     lucrosList.forEach(function (item, index) {
        priceData.data.forEach(function(priceObject){
            if(item.date==new Date(priceObject.date).toISOString()){
                priceObject['lucro']=item['lucro']
            }
            priceObject['date'] = new Date(priceObject['date']).toISOString().split('T')[0].substring(0,4)
        })
      })
 return priceData.data

}