import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store";
import {
    ADD_TO_WISHLIST,
    addToWishList,
    CLEAR_WISH_LIST,
    clearWishList,
    DELETE_FROM_WISHLIST,
    deleteFromWishList
} from "./store/actions/tickerActions";
import {SET_TICKER_DATA} from "./store/actions/tickerSocketActions";
import userEvent from "@testing-library/user-event";



test('tickers data', async () => {
  render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
  );

  const allTickersLink = await screen.findByText(/tickers/i);
  expect(allTickersLink).toBeInTheDocument();
});

test('tickers in WatchingGroup', () => {
    render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );

    const fakeTickersData = [
        {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            price: 279.29,
            change: 64.52,
            change_percent: 0.84,
            dividend: 0.56,
            yield: 1.34,
            last_trade_time: "2021-04-30T11:53:21.000Z"
        },
        {
            ticker:"GOOGL",
            exchange:"NASDAQ",
            price:237.08,
            change:154.38,
            change_percent:0.10,
            dividend:0.46,
            yield:1.18,
            last_trade_time:"2021-04-30T11:53:21.000Z"
        }
    ];
    const fakeWatchingGroupName = 'AAPL';

    store.dispatch({ type: SET_TICKER_DATA, payload: fakeTickersData });
    store.dispatch({ type: ADD_TO_WISHLIST, payload: fakeWatchingGroupName });

    const tickerItem = screen.getByText(/AAPL/i);
    expect(tickerItem).toBeInTheDocument();
});


//Navigation
test('navigation to All Tickers page', () => {
    render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );

    const allTickersLink = screen.getByText(/All Tickers/i);
    expect(allTickersLink).toBeInTheDocument();

    userEvent.click(allTickersLink);
    expect(allTickersLink).toHaveClass('active');
});


test('navigation to Watching Group page', () => {
    render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );

    const watchingGroupLink = screen.getByText(/Watching Group/i);
    expect(watchingGroupLink).toBeInTheDocument();

    userEvent.click(watchingGroupLink);
    expect(watchingGroupLink).toHaveClass('active');
});


//Redux
//Action creators

test('action adding ticker to wishlist', () => {
    const ticker = 'AAPL';
    const expectedAction = {
        type: ADD_TO_WISHLIST,
        payload: ticker,
    };
    expect(addToWishList(ticker)).toEqual(expectedAction);
});

test('action deleting ticker from wishlist', () => {
    const ticker = 'AAPL';
    const expectedAction = {
        type: DELETE_FROM_WISHLIST,
        payload: ticker,
    };
    expect(deleteFromWishList(ticker)).toEqual(expectedAction);
});

test('action clear wishlist', () => {
    const expectedAction = {
        type: CLEAR_WISH_LIST,
    };
    expect(clearWishList()).toEqual(expectedAction);
});

//Reducer
test("reducer ticker data correctly", () => {
    const fakeTickerData = [
        {
            ticker: "AAPL",
            exchange: "NASDAQ",
            price: 279.29,
            change: 64.52,
            change_percent: 0.84,
            dividend: 0.56,
            yield: 1.34,
            last_trade_time: "2021-04-30T11:53:21.000Z",
        },
        {
            ticker: "GOOGL",
            exchange: "NASDAQ",
            price: 237.08,
            change: 154.38,
            change_percent: 0.10,
            dividend: 0.46,
            yield: 1.18,
            last_trade_time: "2021-04-30T11:53:21.000Z",
        },
    ];

    const action = {
        type: SET_TICKER_DATA,
        payload: fakeTickerData,
    };
    const prevTickers = store.getState().tickerReducer.tickers
    store.dispatch(action);
    const updatedState = store.getState().tickerReducer.tickers;

    const expectedState = {
        tickers: fakeTickerData.map((ticker) => {
            const prevTicker = prevTickers.find(
                (item) => item.ticker === ticker.ticker || 0
            );
            return {
                    ...ticker,
                    prevPrice: prevTicker ? prevTicker.price : 0,
                    prevDividend: prevTicker ? prevTicker.dividend : 0,
                    prevYield: prevTicker ? prevTicker.yield : 0,

            };
        })
    };

    expect({tickers: updatedState}).toEqual(expectedState);
});
