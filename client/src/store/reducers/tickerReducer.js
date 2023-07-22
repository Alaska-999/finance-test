import { ADD_TO_WISHLIST, CLEAR_WISH_LIST, DELETE_FROM_WISHLIST } from '../actions/tickerActions';
import { SET_TICKER_DATA} from '../actions/tickerSocketActions';

const initialState = {
	tickers: [],
	watchingGroupNames: [],
	watchingGroup: [],
};

const tickerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TICKER_DATA:
			const tickersArr = action.payload.map((ticker) => ticker);
			const newTickers = tickersArr.map((ticker) => {
				return {
					...ticker,
					prevPrice: state.tickers.find((item) => item.ticker === ticker.ticker)?.price || 0,
					prevDividend: state.tickers.find((item) => item.ticker === ticker.ticker)?.dividend || 0,
					prevYield: state.tickers.find((item) => item.ticker === ticker.ticker)?.yield || 0,
				};
			});

			return {
				...state,
				tickers: newTickers,
			};

		case ADD_TO_WISHLIST:
			if (state.watchingGroupNames.includes(action.payload)) {
				return state;
			} else {
				return {...state, watchingGroupNames: [...state.watchingGroupNames, action.payload]};
			}
		case DELETE_FROM_WISHLIST:

			return {
				...state,
				watchingGroup: [
					...state.watchingGroup.filter((ticker) => ticker.ticker !== action.payload),
				],
				watchingGroupNames: [
					...state.watchingGroupNames.filter((ticker) => ticker !== action.payload),
				],
			};
		case CLEAR_WISH_LIST:
			return {
				...state,
				watchingGroup: [],
				watchingGroupNames: [],
			};

		default:
			return state;
	}
};

export default tickerReducer;
