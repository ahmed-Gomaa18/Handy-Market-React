import React from 'react';
// import { useState } from 'react';

export const SearchStore = ({setSearch}) => {

  return (
    <input type="text" className="form-control w-50 text-center" placeholder="Search By Product Name" onChange={(e)=>setSearch(e.target.value)} />
  )
}
