import React from "react";
import Chart from "react-apexcharts";
import { data } from '../../data/iconData';
const CustomerReview = () => {
 
  return (
    <div className="CustomerReview">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  );
};

export default CustomerReview;
