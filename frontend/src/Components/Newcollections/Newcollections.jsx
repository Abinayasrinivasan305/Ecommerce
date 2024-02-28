import React, { useEffect, useState } from 'react'
import './Newcollections.css';


import Item from '../Items/Items';

export const Newcollections = () => {
  const [new_collection,setNew_collection] = useState([])

  useEffect(()=>{
    fetch('/ecomm/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  },[]);
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,index)=>{
                return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>

    </div>
  )
}
