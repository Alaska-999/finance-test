import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { startTickerUpdates } from '../store/actions/tickerSocketActions';
import Headings from './Headings';
import TickerItem from './TickerItem';

const TickersList = () => {
	const dispatch = useDispatch();

	const tickers = useSelector((state) => state.tickerReducer.tickers);

	useEffect(() => {
		if (tickers.length === 0) dispatch(startTickerUpdates());
	}, [tickers, dispatch]);

	return (
		<TickerList>
			<Headings />
			{tickers?.map((ticker, index) => (
				<TickerItem
					key={index}
					{...ticker}
					yieldValue={ticker.yield}
					isAdded={false}
				/>
			))}
		</TickerList>
	);
};

const TickerList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export default TickersList;
