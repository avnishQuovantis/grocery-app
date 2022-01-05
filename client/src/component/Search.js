import React, { useEffect, useState } from 'react'
import "./css/catagory.scss"
import { useSelector, useDispatch } from 'react-redux'
import Item from './Item'
import { useParams } from 'react-router'
import Rows from './Rows'
import axios from 'axios'

export default function Search() {
  let items = useSelector(state => state.home.data)
  const dispatch = useDispatch()
  let { search } = useParams()
  useEffect(async () => {
    let url = "http://localhost:9000/search/" + search
    let val = await axios.post(url, { search })
    let newVal = val.data.data.length > 0 ? val.data.data : []
    console.log(newVal);
    dispatch({ type: "initialHomeData", payload: newVal })
  }, [search])

  return (
    <div className="mainContainer">
      {console.log(items)}

      <Rows data={items} />
    </div>
  )
}
