import React, { useContext } from 'react'
import { Shopcontext } from '../Context/Shopcontext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrum/Breadcrum';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const {all_product}=useContext(Shopcontext);
  const {productId}=useParams();{/* which will fetch product id which is in string form*/}
  const product =all_product.find((e)=>e.id===Number(productId));       {/* if the condition is true the product will store product variable and we displayed the product*/}
  return (
    <div>
        {/*design the product page create one breadcrum*/}
        <Breadcrum product={product}/>{/* link the product with the image so goto items.jsx*/}
        <ProductDisplay product={product}/>                    {/* which there are the productdisplay props used to display our images ,title and prices*/}
        <Descriptionbox/>     
        <RelatedProducts/>                                {/* adding description box*/}
    </div>
  )
}
