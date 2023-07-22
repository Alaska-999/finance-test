export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const CLEAR_WISH_LIST = 'CLEAR_WISH_LIST';

export const addToWishList = (ticker) => ({
    type: ADD_TO_WISHLIST,
    payload: ticker
})

export const deleteFromWishList = (ticker) => ({
    type: DELETE_FROM_WISHLIST,
    payload: ticker
})

export const clearWishList = () => ({
    type: CLEAR_WISH_LIST,
})