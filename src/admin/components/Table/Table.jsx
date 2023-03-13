import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./Table.module.css";
import moment from "moment/moment";

const BasicTable = () => {
  const [productData, productDataState] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/admin/notApproval', {
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
    }).then((data) => {
      let test = data.data.products;
      productDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, []);

  const updateProductState = (param) => {
    axios.patch(`http://localhost:3000/api/v1/admin/Approval/${param}`, {},
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
      }).then((res) => {
        console.log("sucess", res);
        let result = productData.filter((product)=> product._id!==param);
        productDataState(result);
      }).catch((err) => {
        console.log("error msg", err);
      });
  }

  return (
    <div className={`container ${styles.Table}`}>
      <div className="row">
        <h3>Recent Product</h3>
        <TableContainer style={{ boxShadow: "0px 13px 20px 0px #80808029" }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="left">Created by</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {productData.map((row) => (
                <TableRow
                  key={row.product_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.product_name}
                  </TableCell>
                  <TableCell align="left">{row.created_by.user_name}</TableCell>
                  <TableCell align="left">{moment(row.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")}</TableCell>
                  <TableCell align="left">
                    <button className={styles.status} onClick={() => {
                      const confirmBox = window.confirm("Do you really want to approve this product?");
                      if (confirmBox === true) {
                        updateProductState(row._id)
                      }
                    }}>Approve</button>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/dashboard/dashboardProductDetails/${row._id}`}>
                      <button className={styles.status}>Details</button>
                    </Link>
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
