import './Auth.css'
import StocksPriceList from './StocksPriceList';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react'
import { returnMainDashStocksInfoList } from '../domain/mainDashboardFunctions';

const MainDashboardBody = () => {
    const [searchQuery, setSearchQuery] = useState(null)
    const [stocks, setStocks] = useState([]);
    const [queriedStocks,setQueriedStocks]=useState([])
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
                <SearchBar onChange={setSearchQuery} />
                <span className="item sideBar"></span>
                <div className="item mainDash">
                    <div>
                        <StocksPriceList stocks={queriedStocks} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainDashboardBody;