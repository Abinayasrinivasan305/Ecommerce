import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';

export const AddProduct = () => {
    const [image, setImage] = useState("");
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const changeHandlerImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            setImage(base64Image);
            setProductDetails({ ...productDetails, image: base64Image });
        };

        reader.onerror = (error) => {
            console.log("Error: ", error);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const Add_product = async () => {
        console.log(productDetails);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: productDetails.image })
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.success) {
                console.log("Image uploaded successfully");
                setProductDetails({ ...productDetails, image: responseData.image });
            } else {
                console.error("Error uploading image:", responseData.error);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input type="text" name='name' placeholder='Type here' value={productDetails.name} onChange={changeHandler} />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} type="text" name="old_price" placeholder='Type here' onChange={changeHandler} />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} type="text" name="new_price" placeholder='Type here' onChange={changeHandler} />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} name="category" className='add-product-selector' onChange={changeHandler}>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    {image === "" || image === null ? <img src={upload_area} className='addproduct-thumnail-img' /> : <img src={image} className='addproduct-thumnail-img' alt='' />}
                </label>
                <input type='file' name='image' id='file-input' onChange={changeHandlerImage} hidden />
            </div>
            <button onClick={Add_product} className='addproduct-btn'>Add</button>
        </div>
    );
};

export default AddProduct;
