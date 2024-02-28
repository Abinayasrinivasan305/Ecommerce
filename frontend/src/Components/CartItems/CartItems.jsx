import React, { useContext } from 'react'
import './CartItems.css'
import { Shopcontext } from '../../Context/Shopcontext'
import remove_icon from '../Assets/cart_cross_icon.png';
import toast from 'react-hot-toast';
export const CartItems = () => {
    //access the data product and functions using context api
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,getTotalCartItems}=useContext(Shopcontext);

    function Placeorder(){
      const basketcount =getTotalCartItems();

      if(basketcount>0){
      
           toast.success("Order Placed Successfully");
      }
      else{
        toast.error("Please add items to place order")
      }
      
    }
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
       {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                     {/*Individual Cart Item*/}
       return  <div>
                       <div className="cartitems-format  cartitems-format-main">
                         <img src={e.image} alt="" className='carticon-product-icon'/>
                          <p>{e.name}</p>            {/*product name*/}                                         
                          <p>${e.new_price}</p>
                          <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                          <p>${e.new_price*cartItems[e.id]}</p>{/* which is amount price and quantity which is get from shopcontext api*/}
                          <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""/>      {/*remove icon*/}
                        </div>
                        <hr />
                   </div>
                }
                return null;
       })}
       <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={Placeorder}>PLACE ORDER</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code,Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
         
       </div>

    </div>
  )
}
export default CartItems;