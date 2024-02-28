import React, { createContext, useEffect, useState } from "react";


export const Shopcontext=createContext(null);//created one context which is named as shopcontext


 {/* cart logic-create one function that create a empty cart 
     that will be object where our key values be the product id and product value will be quantity of the product*/}
     const getDefaultCart=()=>{
        let cart={}
        //number of key value pairs is that will be all_product length values
        //the for loop is to initializing length of the objeect but empty cart only it has value zero
        for(let index=0;index<300+1;index++){
            cart[index]=0;
        }
        return cart;
    }


const ShopcontextProvider=(props)=>{      {/*created one function named as shopcontextprovider passing the props*/}

      
    const [all_product,setAll_product]=useState([]);                   {/* display tha all product from our api*/}
    const [cartItems,setCartItems]=useState(getDefaultCart());       {/* get an empty cart it size will be all_product length and
                                                                          pass this variable using contextvalue props*/}
   
    useEffect(()=>{
         fetch('/ecomm/allproducts')
         .then((response)=>response.json())
         .then((data)=>setAll_product(data))


         if(localStorage.getItem('auth-token')){
            fetch('/ecomm/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
              .then((data)=>setCartItems(data));
         }
    },[])
    //add products in our cart logic
//let me look into it wait
    const addToCart=(itemId)=>{
        setCartItems((previousvalue)=>({...previousvalue,[itemId]:previousvalue[itemId]+1}))
        if(localStorage.getItem('auth-token')){                //if we logged in we add items to the db 
                         fetch('/ecomm/addtocart',{
                            method:'POST',
                            headers:{
                                Accept:'application/form-data',
                                'auth-token':`${localStorage.getItem('auth-token')}`,
                                'Content-Type':'application/json',
                            },
                            body:JSON.stringify({"itemId":itemId}),
                         })     
                         .then((response)=>response.json())                               //(actually in db the logged user has 300 indexes for adding cart data (product id)the logged user who select the product that prod id need to store in db)
                         .then((data)=>console.log(data));
              
        }

    }

    const removeFromCart=(itemId)=>{
        setCartItems((previousvalue)=>({...previousvalue,[itemId]:previousvalue[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('/ecomm/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
             })     
             .then((response)=>response.json())
             .then((data)=>console.log(data));
              
            
    
        

        }
    }

    {/* Totalcart amt logic*/}
    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item));  {/*get that product and store in itemInfo and
                                                                                         return the totalamt and pass to contextvalue*/}
                totalAmount+=itemInfo.new_price * cartItems[item];

            }
            
        }
        return totalAmount;
    }
    
    {/*navbar basket count login*/}
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

     {/*provide contextvalue variable where we store the data and functions that we want to access using context*/}
     const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

       return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    )
}

export default ShopcontextProvider;