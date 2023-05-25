import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./Table.module.css";
import moment from "moment/moment";

import Swal from "sweetalert2";

const BasicTable = () => {
  const [productData, productDataState] = useState([]);

  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/admin/notApproval', {
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
    }).then((data) => {
      let test = data.data.products;
      productDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [productData]);

  const updateProductState = (param) => {
    axios.patch(`https://handy-market-api.onrender.com/api/v1/admin/Approval/${param}`, {},
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
      }).then((res) => {
        toast.success("Updated Successfuly", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        let result = productData.filter((product)=> product._id!==param);
        productDataState(result);
      }).catch((err) => {
        console.log("error msg", err);
      });
  }
  const deleteProduct = (param) => {
    try {
      axios.delete(`https://handy-market-api.onrender.com/api/v1/admin/delete/notApproval/${param}`,
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
    <div className={`container ${styles.Table}`}>
      <div className="row">
        <h3>Recent Product</h3>
        <TableContainer className={styles.TableContainer} >
          <Table  aria-label="simple table">
            <TableHead  >
              <TableRow >
                <TableCell className="fw-bold" align="center">Product Name</TableCell>
                <TableCell className="fw-bold" align="center">Created By</TableCell>
                <TableCell className="fw-bold" align="center">Date</TableCell>
                <TableCell className="fw-bold"align="center">Status</TableCell>
                <TableCell className="fw-bold"align="center">Product Details</TableCell>
                <TableCell className="fw-bold" align="center">Delete Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {productData.map((row) => (
                <TableRow
                  key={row.product_name}
                  
                >
                  <TableCell component="th" scope="row">
                    {row.product_name}
                  </TableCell>
                  <TableCell align="left">{row.created_by.user_name}</TableCell>
                  <TableCell align="center">{moment(row.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")}</TableCell>
                  <TableCell align="center">
                    <button className={styles.status} onClick={() => {
                      Swal.fire({
                        title: 'Do you really want to approve this product?',
                        showCancelButton: true,
                        confirmButtonText: 'Approve',
                        icon: 'success'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          updateProductState(row._id);
                        } 
                      })
                    }}>Approve</button>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/dashboard/dashboardProductDetails/${row._id}`}>
                      <button className={styles.status}>Details</button>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <button className={styles.status} onClick={() => {
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
                    }}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default BasicTable;
