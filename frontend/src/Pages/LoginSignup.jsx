import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  
            const [state,setState]=useState("Login")
            const[formData,setFormData]=useState({
                                        username:"",
                                        password:"",
                                        email:""
                                      })
            //creating the api
            const login=async ()=>{
                console.log("Login Function executed",formData);
              let responseData;
              await fetch("/ecomm/login",{
                method:'POST',
                headers:{
                   Accept:'application/form-data',
                  "Content-Type":'application/json',
                },
                body:JSON.stringify(formData)
              }).then((response)=> response.json()).then((data)=>{
                responseData=data;
              })

              if(responseData.success){
                localStorage.setItem('auth-token',responseData.token);
                window.location.replace("/");
              }
              else {
                alert(responseData.errors);
              }
            }    


            
            
            const signup=async ()=>{
              console.log("Signup function executed",formData)
              let responseData;
              await fetch("/ecomm/signup",{
                method:'POST',
                headers:{
                  Accept:'application/form-data',
                  "Content-Type":'application/json',
                },
                body:JSON.stringify(formData)
              }).then((response)=> response.json()).then((data)=>{
                responseData=data;
              })

              if(responseData.success){
                localStorage.setItem('auth-token',responseData.token);
                window.location.replace("/");
              }
              else {
                alert(responseData.errors)
              }

            }

            const changeHandler =(e)=>{
                      setFormData({...formData,[e.target.name]:e.target.value})
            }
             return (
                                   <div className='loginsignup'>
                                        <div className="loginsignup-container">
                                            <h1>{state}</h1>
                                            <div className="loginsignup-fields">

                                               {state==="Sign Up"?<input type="text" placeholder='Your Name' name="username" value={formData.username} onChange={changeHandler} />:<></>}
                                               <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={changeHandler}/>
                                               <input type="password" placeholder='Password' name="password" value={formData.password} onChange={changeHandler}/>
                                             </div>
                                           <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                                           {state==="Sign Up"?
                                            <p className="loginsignup-login">Already hace and account?<span style={{cursor:"pointer",textDecoration:"underline",color:"blue"}}
                                            onClick={()=>{setState("Login")}}>Login here</span></p>:
                                            <p className="loginsignup-login">Create an account?<span style={{cursor:"pointer",textDecoration:"underline",color:"blue"}}
                                             onClick={()=>{setState("Sign Up")}}>Click  here</span></p>}
                                           <div className="loginsignup-agree">
                                               <input type="checkbox" name='' id=''/>
                                               <p>By continuing, i agree to the terms of use and privacy.</p>
                                           </div>

                                        </div>  
                                     </div>
        
  
  )
}

