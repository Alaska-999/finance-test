import { io } from 'socket.io-client';

export const SET_TICKER_DATA = 'SET_TICKER_DATA';

const socket = io('http://localhost:4000');

export const startTickerUpdates = () => {
    return (dispatch) => {
        socket.on('ticker', (data) => {
            dispatch({ type: SET_TICKER_DATA, payload: data });
        });

        socket.emit('start');

        return () => {
            socket.off('ticker');
        };
    };
}



