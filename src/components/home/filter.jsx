import React from "react";
import { Button } from "../ui/button";
import AreaFilter from "./filter/Area";
import BathroomFilter from "./filter/Bathroom";
import BedroomFilter from "./filter/Bedroom";
import RentFilter from "./filter/Rent";

export default function Filter({ filter, setFilter, dataForFilter }) {


  return (
    <div className="w-full ">
    <div className="grid grid-cols-4 gap-4 w-full">
      <div className="col-span-1 flex justify-center items-center">
        <AreaFilter filter={filter} setFilter={setFilter} dataForFilter={dataForFilter.area}/>
      </div>
      <div className="col-span-1 flex justify-center items-center ">
        <RentFilter filter={filter} setFilter={setFilter} dataForFilter={dataForFilter.rent}/>
      </div>
      <div className="col-span-1 flex justify-center items-center ">
        <BedroomFilter filter={filter} setFilter={setFilter} dataForFilter={dataForFilter.bedroom}/>
      </div>
      <div className="col-span-1 flex justify-center items-center ">
        <BathroomFilter filter={filter} setFilter={setFilter} dataForFilter={dataForFilter.bathroom}/>
      </div>
    </div>
  </div>
  
  );
}
