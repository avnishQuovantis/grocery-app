import React from 'react'
import "./css/catagory.scss"
import { useSelector, useDispatch } from 'react-redux'
import Item from './Item'
import { useParams } from 'react-router'
import Rows from './Rows'

export default function Search() {
  let state = useSelector(state => state.home)
  let { search } = useParams()
  // let search=state.search.toLowerCase()
  console.log(search);
  const items = state.data.filter(obj => {
    // return obj["title"].toLowerCase().includes(state.search.toLowerCase())
    return obj["title"].toLowerCase().includes(search.toLowerCase())
  })
  console.log(items);
  return (
    <div className="mainContainer">

      {/* <Item items={items}/> */}
      <Rows data={items} />
    </div>
  )
}
