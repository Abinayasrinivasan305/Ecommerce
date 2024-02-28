import dotenv from "dotenv";

import express from "express"; 
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import connectToMongoDB from "./db/connecttoMongoDB.js";
                                    // express server running port andimport dependencies
                                    //first importing express require parameter is the package name                                               
const __dirname=path.resolve();
const PORT= process.env.PORT || 5000                                                   //using this express we create our app instance
const app=express();
                                             //initialize the mangoose package
dotenv.config().parsed;                  //intialize the json web token
                       //initialize the multer
                          //include the path from the express server ,using this path module we can access our backend directory in our express app
                      //initialize the cors package


app.use(express.json());   //with the help of express.json whatever the req get from respone that is automaticallay parsed through the json
app.use(cors());                                   //using this our reactjs project connect to express app on port 4000

//after this we initalize the database for that we have to create mongodb atlas db 
//Database connection with mongoDb





//Api creation


//Image Storage Engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

//creating uploading endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    })
})

//Schema for Creating Products

const Product=mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,     
    },
})

app.post('/ecomm/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){                                      //generating id logic
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1
    }
    const  product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for deleting Products

app.post('/ecomm/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//new endpoint-to get all the products available in the database using that we display the product in the frontend
//Creating API fro getting all the products

app.get('/ecomm/allproducts',async(req,res)=>{
    let products =    await Product.find({});
    console.log("All products Fetched");
    res.send(products);

})


//Schema creating for user module

const Users=mongoose.model('Users',{
     name:{
        type:String,
     },
     email:{
        type:String,
        unique:true,               //end user create one account with one email id the he can't create another account with the same mail id
     },
     password:{
        type:String,
     },
     cartData:{
        type:Object,
     },
     date:{
        type:Date,
        default:Date.now,
     }

})


//Creating endpoint  for registering the user

app.post('/ecomm/signup',async (req,res)=>{
    

    let check = await Users.findOne({
        email:req.body.email
    })

    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }

    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();//user save in the db


    //after creating account we use jwt authentication

    //creating the token using data object

    const data={
        user:{
            id:user.id
        }
    }

    //generating the token

    const token=jwt.sign(data,process.env.JWT_SECRET)   //2nd parameter is salt -->which our data encrypted (using this our token not readable)
    res.json({success:true,token})
})


//creating endpoint for user login

app.post('/ecomm/login',async (req,res)=>{

    let user= await Users.findOne({email:req.body.email});

    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
        
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
        }
    
        else{
        res.json({success:false,errors:"Wrong Password"});
        }
    }

   
    else{
         res.json({success:false,errors:"Wrong email id"})
    }    

})


//creating endpoint for new collection data
app.get('/ecomm/newcollection',async (req,res)=>{
    let products = await Product.find({});
    let newcollection=products.slice(1).slice(-8);   //which get recently added 8 product
    console.log("Newcollections Fetched")
    res.send(newcollection);
})

//creating endpoint for popular in women

app.get('/ecomm/popularinwomen',async (req,res)=>{
     let products = await Product.find({category:"women"})
     let popularinwomen=products.slice(0,4);
     console.log("Popular in women fetched");
     res.send(popularinwomen);

})

//creating middleware to fetch user(converting auth token into user id)

const fetchUser = async (req,res,next)=>{
    //we take auth token and verify using jwt and using this we find the user

    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();   //token decoded
        }catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//creating endpoint for adding product in cartdata
//req.user has the customer selected product id is for like this verified id:65d04cf6612f42515eb1f068
//now the middle ware attached
app.post('/ecomm/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})   //find the user and in their cartdata it update the cart data
    res.send("Added")
    
})

//creating endpoint to remove the product from cart

app.post('/ecomm/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
       userData.cartData[req.body.itemId]-=1;
       await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
       res.send("Removed")
})

//creating endpoint  to get cart data
app.post('/ecomm/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.use(express.static(path.join(__dirname,"frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server Running on port ${PORT}`)
        connectToMongoDB();
    }
    else{
        console.log("Error:"+error)
    }

})




