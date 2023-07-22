import React from 'react';
import TickerItem from "./TickerItem";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Headings from "./Headings";
import {clearWishList} from "../store/actions/tickerActions";

const WatchingGroup = () => {

    const watchingGroupNames = useSelector((state) => state.tickerReducer.watchingGroupNames);
    const tickers = useSelector((state) => state.tickerReducer.tickers);
    const watchingGroup = tickers.filter(item => watchingGroupNames.includes(item.ticker));

    const dispatch = useDispatch();

    return (
        <TickerList>
            <Headings/>
            {watchingGroup.map((ticker, index) => (
                <TickerItem key={index} {...ticker} yieldValue={ticker.yield} isAdded={true}/>
            ))}
            <Button onClick={() => dispatch(clearWishList())}>Remove All</Button>
        </TickerList>
    );
};


const TickerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

`;

const Button = styled.button`
  margin: 40px auto;
  display: block;
  font-size: 18px;
`;

export default WatchingGroup;