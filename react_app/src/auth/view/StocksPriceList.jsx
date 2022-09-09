import './Auth.css'
import StockPriceCard from './StocksPriceCard';
import React, { useState, useEffect } from 'react';
import { returnMainDashStocksInfoList } from '../domain/mainDashboardFunctions';



const StocksPriceList = ({stocks}) => {

    

    return (
        <div className="stocksPriceList">
            {stocks.map((stock) => <StockPriceCard stock={stock}/>)}
        </div>
    );
}

export default StocksPriceList;