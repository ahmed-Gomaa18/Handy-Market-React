import React,{useState ,useEffect,} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from "./Table.module.css";

export default function BasicTable() {

 localStorage.setItem("userToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODA0NDAwOSwiZXhwIjoxNjc4NjQ4ODA5fQ.r5N5PWyZJmfDDz9aM2qrJ6hmDvob-pzG1Nv1XtIdY1c");
  const [productData,productDataState] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/admin/notApproval',{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{
      
      var test=data.data.products;
      productDataState(test);
      
    
  }).catch((err)=>{
      console.log("error msg" ,);
    });

  },[productData]);

  const makeStyle=(status)=>{
    if(status === 'true')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if(status === 'false')
    {
      return{
        background: '#ffadad8f',
        color: 'red',
      }
    }
    else{
      return{
        background: '#59bfff',
        color: 'white',
      }
    }
  }

  const updateProductState = (param)=>{
 
    axios.patch(`http://localhost:3000/api/v1/admin/Approval/${param}`,{},{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((res)=>{

      console.log("sucess",res)
    
  }).catch((err)=>{
      console.log("error msg" ,err);
    });


  }
  
  return (

    <div className="{styles.Table} container">
      <div className="row ">
        <h3>Recent Product</h3>
        <TableContainer  style={{ boxShadow: "0px 13px 20px 0px #80808029" }} >

          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead >

              <TableRow>
  
                <TableCell  >Product Name</TableCell>
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
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">
                   <button className={styles.status} style={makeStyle(row.product_approval)} onClick={()=>{updateProductState(row._id)}}>Approve</button>
                  </TableCell>
                  <TableCell align="left" className={styles.Details}><Link to={`/dashboardProductDetails/${row._id}`} className={styles.link}>Details</Link> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
  );
}
