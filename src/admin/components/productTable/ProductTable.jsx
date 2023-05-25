import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { ToastContainer, toast } from 'react-toastify';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './productTable.module.css';

import Swal from "sweetalert2";

const ProductTable = () => {
  const [productsData, productsDataState] = useState([]);

  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/product', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user-token")}`
      }
    }).then((data) => {
      let test = data.data;
      productsDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [productsData]);
  
  const deleteProduct = (param) =>{
    try {
      axios.delete(`https://handy-market-api.onrender.com/api/v1/admin/delete/${param}`,
        { headers: { "authorization": `Bearer ${localStorage.getItem("user-token")}` } 
      }).then((res) =>{
        toast.success("Deleted Successfuly", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }).catch((err) => {
        console.log("error msg", err);
      })
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='{styles.Table} col-lg-10 col-md-9'>
      <h3>All Product</h3>
      <TableContainer className={styles.tableContainer} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold" align="left">Product Name</TableCell>
              <TableCell className="fw-bold" align="center">Amount</TableCell>
              <TableCell className="fw-bold" align="center">Price</TableCell>
              <TableCell className="fw-bold" align="center">Discount</TableCell>
              <TableCell className="fw-bold" align="center">Sold Items</TableCell>
              <TableCell className="fw-bold" align="center">Created By</TableCell>
              <TableCell className="fw-bold" align="center">Details</TableCell>
              <TableCell className="fw-bold" align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {productsData.map((row) => (
              <TableRow key={row.product_name} >
                <TableCell align="left">{row.product_name}</TableCell>
                <TableCell align="center">{row.number_of_items}</TableCell>
                <TableCell align="center">{row.price} LE</TableCell>
                <TableCell align="center">{row.discount}%</TableCell>
                <TableCell align="center">{row.sold_items}</TableCell>
                <TableCell align="center">{row.created_by.user_name}</TableCell>
                <TableCell align="center" className={styles.Details}>
                  <Link to={`/dashboard/dashboardALLProductDetails/${row._id}`}>
                    <button className={styles.status}>Details</button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <button className={styles.status}
                    onClick={() => {
                      Swal.fire({
                        title: 'Do you really want to delete this product?',
                        showCancelButton: true,
                        confirmButtonText: 'Delete',
                        icon: 'error'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProduct(row._id);
                        } 
                      })
                    }}
                    >Delete</button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;