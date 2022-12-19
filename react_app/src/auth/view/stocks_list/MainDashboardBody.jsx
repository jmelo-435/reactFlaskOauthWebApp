import '../auth/Auth.css'
import StocksPriceList from './StocksPriceList';
import SearchBar from './SearchBar';
import StockDashboardBody from '../stock_dashboard/StockDashboardBody';
import { useState, useEffect } from 'react'
import { returnMainDashStocksInfoList, returnSelectedStockData,returnSegmentsList } from '../../domain/mainDashboardFunctions';
import { returnStockDashboardChartData } from '../../domain/mainDashboardFunctions'

const MainDashboardBody = () => {
    
    const [searchQuery, setSearchQuery] = useState(null)
    const [stocks, setStocks] = useState([]);
    const [queriedStocks,setQueriedStocks]=useState([]);
    const [chartData,setChartData]=useState([]);
    const [segments,setSegments]=useState([]);
    const [segment,setSegment]=useState("Todos");
    const [selectedStock,setSelectedStock]=useState({
        id:"PETR4",
        name:"",
        price:null,
        relevance:null,
        setor:null,
        proffits:{},
        monthVariation:null,
        weekVariation:null,
        yearVariation: null
     }); 
    const [displayedStock,setDisplayedStock]=useState( {
        id:"PETR4",
        name:"",
        price:null,
        relevance:null,
        setor:null,
        proffits:{},
        monthVariation:null,
        weekVariation:null,
        yearVariation: null
     })
    useEffect(() => {
        async function fetch() {
            const response = await returnMainDashStocksInfoList(segment)
            console.log(segment)
            setStocks(response.sort((a, b) => a.relevance - b.relevance));
            setQueriedStocks(response.sort((a, b) => a.relevance - b.relevance));
          
        }
        fetch();

    }, [segment]);

    useEffect(() => {
        async function fetch(){
            const dummyStock = await returnSelectedStockData(selectedStock)
            const chartData = await returnStockDashboardChartData(selectedStock)
            setDisplayedStock(dummyStock);
            setChartData(chartData)
            
        }
        fetch()

    }, [selectedStock]);
    useEffect(() => {
        if (searchQuery !== null) {
            let filtered = [];
            const input = searchQuery.toLowerCase();
            if (input) {
                filtered = stocks.filter((el) => {
                    return Object.values(el).some((val) =>
                        String(val).toLowerCase().includes(input)
                    );
                });
            setQueriedStocks(filtered)

            }
            else{
            setQueriedStocks(stocks)

            }
        }
    }, [searchQuery])

    const handleChange = event => {
        console.log(event.target.value);
        setSegment(event.target.value);
      };

    useEffect(()=>{
        async function fetch() {
             
            const response = await returnSegmentsList()
            setSegments(["Todos"].concat(response))
          
        }
        fetch();
    }
,[]
    )
    return (
        <div className="main">
            <section className="mainDashboardBody">
                <div className="item sideBarTop">
                <h1>Categoria</h1>

                <select value = {segment} onChange = {handleChange}>
                            {segments.map((segmento)=><option value = {String(segmento)}>{segmento}</option>)}
                </select>
                </div>
                <div className="item sideBar">
                    <div>
                        
                        <StocksPriceList stocks={queriedStocks} selectStock={setSelectedStock} />
                    </div>
                </div>
                <div className="item mainDash">
                    <div>
                        <StockDashboardBody stockData ={displayedStock} chartData = {chartData}/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainDashboardBody;