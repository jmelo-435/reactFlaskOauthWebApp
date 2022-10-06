import '../auth/Auth.css'
import StockPriceCard from './StocksPriceCard';
import React, { useState, useEffect } from 'react';
import { returnMainDashStocksInfoList } from '../../domain/mainDashboardFunctions';



const StocksPriceList = ({stocks,selectStock}) => {

    

    return (
        <div className="stocksPriceList">
            {stocks.map((stock) => <StockPriceCard stock={stock} selectStock = {selectStock}/>)}
        </div>
    );
}

export default StocksPriceList;