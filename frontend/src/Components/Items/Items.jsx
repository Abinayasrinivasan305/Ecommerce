import React from 'react'
import './Items.css';
import { Link } from 'react-router-dom';
export const Items = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link> {/* onclick function is used for,
       when you click the related products on products page it go to up using property scrollTo and giving x and y coords*/}
      <p>{props.name}</p>                                                
      <div className='item-prices'>
        <div className="item-price-new">
            ${props.new_price}
        </div>
        <div className="item-price-old">
            ${props.old_price}
        </div>

      </div>
    </div>
  )
}
export default Items;
