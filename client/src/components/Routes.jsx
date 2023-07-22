import React from 'react';
import Tickers from "./Tickers";
import {Route, Routes} from "react-router-dom";
import WatchingGroup from "./WatchingGroup";

const RoutesComp = () => {
    return (
        <Routes>
            <Route path='/' element={<Tickers/>}/>
            <Route path='/watching' element={<WatchingGroup/>}/>
        </Routes>
    );
};

export default RoutesComp;