import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function useBasket() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.currUser)
    const cart = useSelector(state => state.cart.cart)
    const history = useHistory()
    const [items, setItems] = useState(cart)
    useEffect(() => {
        console.log("inside useBasket => ", items);
        dispatch({ type: "cartChange", payload: items })

    }, [items])
    const addBasket = async (obj) => {
        if (auth) {

            let basketObj = [];
            let isPresent = cart.find((item) => {
                return item.id == obj.id
            });
            if (isPresent == undefined) {
                basketObj = [...cart, { ...obj, qty: 1 }]
            } else {
                basketObj = increaseQuantity(cart, obj);
            }
            let newItem = await axios.post("http://localhost:9000/editCart", { id: auth._id, items: basketObj })
            console.log("newItem addBasket", newItem);
            setItems(newItem.data.cart)
        } else {
            alert("please login first")
            history.push("/login")
        }
    };
    const removeBasket = async (obj) => {
        if (auth) {
            let cartObj = [];
            if (obj.qty == 1) {
                cartObj = removeFromCart(cart, obj);
            } else {
                cartObj = decreaseQuantity(cart, obj);
            }
            let newItem = await axios.post("http://localhost:9000/editCart", { id: auth._id, items: cartObj })
            setItems(newItem.data.cart)
        }
        else {
            alert("please login first")
            history.push("/login")
        }
    };
    const deleteBasket = async (obj) => {

        if (auth) {
            let newObj = removeFromCart(cart, obj);
            let newItem = await axios.post("http://localhost:9000/editCart", { id: auth._id, items: newObj })
            console.log(newItem.data.cart);
            setItems(newItem.data.cart)
        } else {
            alert("please login first")
            history.push("/login")
        }
    };
    return [addBasket, removeBasket, deleteBasket];
}
function increaseQuantity(array, action) {
    let temp = [];
    console.log(array, action);
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        if (array[i].id == action.id) {
            obj = { ...array[i], qty: array[i].qty + 1 };
            temp[i] = obj;
        } else {
            temp[i] = obj;
        }
    }
    return temp;
}
function decreaseQuantity(array, action) {
    let temp = [];
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        if (array[i].id == action.id) {
            obj = { ...array[i], qty: array[i].qty > 0 ? array[i].qty - 1 : 0 };
            temp[i] = obj;
        } else {
            temp[i] = obj;
        }
    }
    return temp;
}

function removeFromCart(array, action) {
    let temp = array.filter((obj) => {
        return obj.id != action.id;
    });
    return temp;
}