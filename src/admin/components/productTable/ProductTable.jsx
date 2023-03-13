import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './productTable.module.css';

const ProductTable = () => {
  const [productsData, productsDataState] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/product', {
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
      axios.delete(`http://localhost:3000/api/v1/admin/delete/${param}`,
        { headers: { "authorization": `Bearer ${localStorage.getItem("user-token")}` } 
      }).then((res) =>{
        console.log("deleted successfuly");
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
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Discount</TableCell>
              <TableCell align="left">Sold Items</TableCell>
              <TableCell align="left">Created By</TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {productsData.map((row) => (
              <TableRow key={row.product_name} >
                <TableCell >{row.product_name}</TableCell>
                <TableCell align="left">{row.number_of_items}</TableCell>
                <TableCell align="left">${row.price}</TableCell>
                <TableCell align="left">{row.discount}%</TableCell>
                <TableCell align="left">{row.sold_items}</TableCell>
                <TableCell align="left">{row.created_by.user_name}</TableCell>
                <TableCell align="left" className={styles.Details}>
                  <Link to={`/dashboard/dashboardALLProductDetails/${row._id}`}>
                    <button className={styles.status}>Details</button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <button className={styles.status}
                    onClick={() => {
                      const confirmBox = window.confirm("Do you really want to delete this product?");
                      if (confirmBox === true) {
                        deleteProduct(row._id);
                      }
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