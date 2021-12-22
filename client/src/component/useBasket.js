import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function useBasket() {
    const dispatch = useDispatch();
    const select = useSelector(state => state)
    const addBasket = (obj) => {
        dispatch({
            type: "addInBasket",
            payload: obj,
        });
    };
    const removeBasket = (obj) => {
        dispatch({
            type: "removeFromBasket",
            payload: obj,
        });
    };
    const deleteBasket = (obj) => {
        dispatch({
            type: "deleteItem",
            payload: obj,
        });
    };
    return [addBasket, removeBasket, deleteBasket];
}
