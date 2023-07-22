import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addToWishList, deleteFromWishList} from "../store/actions/tickerActions";

const TickerItem = (props) => {
    const {
        ticker,
        exchange,
        price,
        change,
        change_percent,
        dividend,
        yieldValue,
        last_trade_time,
        isAdded,
        prevPrice,
        prevDividend,
        prevYield,
    } = props;

    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };

    const addToWatchListHandler = () => {
        dispatch(addToWishList(ticker))
    }
    const deleteFromWatchListHandler = () => {
        dispatch(deleteFromWishList(ticker))
    }


    return (

        <TickerWrapper>
            <Visible type='checkbox' checked={isVisible} onChange={() => setIsVisible(!isVisible)}/>
            {isVisible ? (
                <TickerBox>
                    <TickerName>{ticker}</TickerName>
                    <TickerCell>{exchange}</TickerCell>
                    <TickerCellData className={price >= prevPrice ? 'positive' : 'negative'}>
                        {price}
                    </TickerCellData>
                    <TickerCellData className={price >= prevPrice ? 'positive' : 'negative'}>
                        {change}
                    </TickerCellData>
                    <TickerCellData className={price >= prevPrice ? 'positive' : 'negative'}>
                        {price >= prevPrice ? '+' : '-'}
                        {change_percent}
                    </TickerCellData>
                    <TickerCellData className={dividend >= prevDividend ? 'positive' : 'negative'}>
                        {dividend}
                    </TickerCellData>
                    <TickerCellData className={yieldValue >= prevYield ? 'positive' : 'negative'}>
                        {yieldValue}
                    </TickerCellData>
                    <TickerCell>
                        {formatTime(last_trade_time)}
                    </TickerCell>
                    {isAdded ?
                        <Button type='button' onClick={deleteFromWatchListHandler}>Delete</Button>
                        :
                        <Button type='button' onClick={addToWatchListHandler}>Add</Button>
                    }
                </TickerBox>
            ) : (
                <TickerBox>
                    <TickerName>{ticker}</TickerName>
                </TickerBox>
            )}
        </TickerWrapper>
    );
};

const TickerWrapper = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  position: relative;
`;

const Visible = styled.input`
  height: 25px;
  width: 25px;
  position: absolute;
  left: -40px;
`;

const TickerBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;

  @media (max-width: 820px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const TickerName = styled.h3`
  padding: 5px;
  width: 80px;
  margin: 0 5px;
  text-align: center;
`;

const TickerCellData = styled.div`
  padding: 5px;
  width: 80px;
  margin: 0 5px;
  text-align: center;
  border-radius: 25px;

  &.positive {
    background-color: rgba(33, 208, 33, 0.5);
  }

  &.negative {
    background-color: rgba(236, 58, 58, 0.5);
  }
`;

const TickerCell = styled.div`
  width: 80px;
  margin: 0 5px;
  padding: 5px;
  text-align: center;
`;

export const Button = styled.button`
  margin-left: 20px;
  @media (max-width: 820px) {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
`;

export default TickerItem;
