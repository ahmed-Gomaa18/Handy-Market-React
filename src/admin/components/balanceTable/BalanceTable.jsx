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
    axios.get('http://localhost:3000/api/v1/admin/balance', { headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } }).then((data) => {
      var test = data.data;
      balanceDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [balanceData]);

  return (
    <div className={` col-lg-10 col-md-9 ${styles.Table}`}>
      <h3>Our Balance</h3>
      <TableContainer className={styles.tableContainer}  >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Total Profit</TableCell>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Order Profit</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceData.map((row) => (
              <TableRow key={row.total_profit}>
                <TableCell align="left">{row.total_profit}  LE</TableCell>
                <TableCell align="left">{row.order_id.user_id}</TableCell>
                <TableCell align="left">{row.order_profit}  LE</TableCell>
                <TableCell align="left">{moment(row.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BalanceTable;