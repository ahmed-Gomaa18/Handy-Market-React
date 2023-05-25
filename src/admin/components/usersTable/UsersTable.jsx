import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './userTable.module.css'


import Swal from "sweetalert2";

const UsersTable = () => {

  const [usersData, usersDataState] = useState([]);
  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/admin/allUsers',{
      headers: {"authorization": `Bearer ${localStorage.getItem("user-token")}` }
    }).then((data) => {
      let test = data.data;
      usersDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [usersData]);

  const BlockUser = async (param, stateblock) => {
    try {
      let result = await axios.patch(`https://handy-market-api.onrender.com/api/v1/admin/user/block/${!stateblock}/${param}`, {},
        { headers: { "authorization": `Bearer ${localStorage.getItem("user-token")}` } })
      if (result) {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`col-lg-10 col-md-9 ${styles.Table}`}>
      <h3>All Users</h3>
      <TableContainer className={` mt-3 ${styles.tableContainer}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold" align="center">User Name</TableCell>
              <TableCell className="fw-bold" align="center">Email</TableCell>
              <TableCell className="fw-bold" align="center">Phone</TableCell>
              <TableCell className="fw-bold" align="center">Role</TableCell>
              <TableCell className="fw-bold" align="center">Active</TableCell>
              <TableCell className="fw-bold" align="center">Block</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {usersData.map((row) => (
              <TableRow key={row.email} >
                <TableCell align="center"> {row.user_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">{row.active ? "Online" : "Offline"}</TableCell>
                <TableCell align="center">
                  <button className={styles.status}
                    onClick={() => {

                      Swal.fire({
                        title: `Do you really want to ${row.isBlocked === true ? "UnBlock" : "Block"} this user?`,
                        showCancelButton: true,
                        confirmButtonText: `${row.isBlocked === true ? "UnBlock" : "Block"}`,
                        icon: 'warning'
                      }).then((result) => {
                        if (result.isConfirmed) {

                          BlockUser(row._id, row.isBlocked);
                        } 
                      })
                     
                    }}>{row.isBlocked === true ? "UnBlock" : "Block"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;