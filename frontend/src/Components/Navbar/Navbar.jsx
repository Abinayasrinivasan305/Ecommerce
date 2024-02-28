import React, { useContext, useRef } from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../../Context/Shopcontext';
import nav_dropdown from '../Assets/nav_dropdown.png';

export const Navbar = () => {
    const [menu,setMenu]=useState("shop");                      //user state variable for navigation hover
    const {getTotalCartItems}=useContext(Shopcontext);    //basket count function is get using shop context;
    const menuRef=useRef();        //which is the navbar reference according to screen sizes
    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');        // when click on the it add the nav-menu visible classname already there remove it
        e.target.classList.toggle('open');                          // add the open classname,if already there means remove it

    }
  return (
    < div className='navbar'>
        <div className='nav-logo'>
            <img  src={logo} alt=""/>
            <p>SHOPIFY</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt=""/>  {/* when click on this a function executed*/}
        
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:"none"}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li> {/* when click on this the horizontal provided corresponding list heading*/}
            <li onClick={()=>{setMenu("mens")}}><Link to='/mens'style={{textDecoration:"none"}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>       
            <li onClick={()=>{setMenu("womens")}}><Link to='/womens'style={{textDecoration:"none"}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{textDecoration:"none"}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li> 
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')?
            <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
                
            <Link to="/cart"> <img src={cart_icon} alt=""/></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>      {/* basket count display here */} 
        </div>
       
    </div>
  )
}
