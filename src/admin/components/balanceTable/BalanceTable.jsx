import React, { useState, useEffect, } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './balanceTable.module.css'
import moment from "moment";

const BalanceTable = () => {
  const [balanceData, balanceDataState] = useState([]);
  
  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/admin/balance', { headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } }).then((data) => {
      var test = data.data;
      balanceDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, []);

  return (
    <div className={` col-lg-10 col-md-9 ${styles.Table}`}>
      <h3>Our Balance</h3>
      <TableContainer className={styles.tableContainer}  >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold" align="center">Created By</TableCell>
              <TableCell className="fw-bold" align="center">User Email</TableCell>
              <TableCell className="fw-bold" align="center">Order Profit</TableCell>
              <TableCell className="fw-bold" align="center">Date</TableCell>
              <TableCell className="fw-bold" align="center">Total Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceData && balanceData.map((row) => (
        
              <TableRow key={row.total_profit}>
                <TableCell align="center">{row.order_id?.user_id?.user_name}</TableCell>
                <TableCell align="center">{row.order_id?.user_id?.email}</TableCell>
                <TableCell align="center">{row.order_profit}  LE</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("ddd, MMM Do YYYY, h:mm a")}</TableCell>
                <TableCell align="center">{row.total_profit}  LE</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BalanceTable;