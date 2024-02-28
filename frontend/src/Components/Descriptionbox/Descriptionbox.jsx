import React from 'react'
import './Descriptionbox.css'

export const Descriptionbox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An ecommerce platform is an online marketplace where businesses can sell their products or services to consumers over the internet. 
                These platforms typically provide tools for inventory management, payment processing, and order fulfillment. 
                They often feature customizable storefronts and user-friendly interfaces to enhance the shopping experience.</p>
                <p>E-commerce platforms offer global reach, enabling businesses to access a vast customer base beyond geographical constraints. 
                    They provide convenience for both sellers and buyers, allowing transactions to occur 24/7 from anywhere with an internet connection.</p>
        </div>

    </div>
  )
}
export default Descriptionbox;
