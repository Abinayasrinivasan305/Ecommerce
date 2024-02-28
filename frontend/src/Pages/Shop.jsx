import React from 'react'
import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { Offers } from '../Components/Offers.js/Offers';
import { Newcollections } from '../Components/Newcollections/Newcollections';
import { NewLetter } from '../Components/NewsLetter/NewLetter';
export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <NewLetter/>
    </div>
  )
}

