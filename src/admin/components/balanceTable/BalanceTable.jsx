import React, { useState, useEffect, } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './balanceTable.module.css'

const BalanceTable = () => {
  localStorage.setItem("userToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODE0NDMxMSwiZXhwIjoxNjc4NzQ5MTExfQ.CqnoJteMEIVQVwcj3PJoDF--z_RyDvP5llRH9EykpX4");
  const [balanceData, balanceDataState] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/admin/balance', { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } }).then((data) => {
      var test = data.data;
      balanceDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [balanceData]);

  return (
    <div className='{styles.Table} col-lg-10 col-md-9'>
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
              <TableRow key={row.total_profit} >
                <TableCell align="left">{row.total_profit}</TableCell>
                <TableCell align="left">{row.order_id.user_id}</TableCell>
                <TableCell align="left">{row.order_profit}</TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BalanceTable;