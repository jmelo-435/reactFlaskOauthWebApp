import '../auth/Auth.css'
import StocksPriceList from './StocksPriceList';
import SearchBar from './SearchBar';
import StockDashboardBody from '../stock_dashboard/StockDashboardBody';
import { useState, useEffect } from 'react'
import { returnMainDashStocksInfoList, returnSelectedStockData } from '../../domain/mainDashboardFunctions';

const MainDashboardBody = () => {
    
    const [searchQuery, setSearchQuery] = useState(null)
    const [stocks, setStocks] = useState([]);
    const [queriedStocks,setQueriedStocks]=useState([]);
    const [displayedStock,setDisplayedStock]=useState([])
    useEffect(() => {
        async function fetch() {
            const response = await returnMainDashStocksInfoList()
            console.log(response)
            setStocks(response.sort((a, b) => a.relevance - b.relevance));
            setQueriedStocks(response.sort((a, b) => a.relevance - b.relevance));
          
        }
        fetch();

    }, []);
    useEffect(() => {
        async function fetch(){
            const dummyStock = await returnSelectedStockData('UGPA3')
            console.log(dummyStock)
            setDisplayedStock(dummyStock);
        }
        fetch()

    }, []);
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
    return (
        <div className="main">
            <section className="mainDashboardBody">
            
                <div className="item sideBar">
                    <div>
                        <StocksPriceList stocks={queriedStocks} />
                    </div>
                </div>
                <div className="item mainDash">
                    <div>
                        <StockDashboardBody stockData ={displayedStock}/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainDashboardBody;