import React,{useState ,useEffect,} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './productTable.module.css'
const ProductTable = () => {
  
 localStorage.setItem("userToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODA0NDAwOSwiZXhwIjoxNjc4NjQ4ODA5fQ.r5N5PWyZJmfDDz9aM2qrJ6hmDvob-pzG1Nv1XtIdY1c");
 const [productsData,productsDataState] = useState([]);

 useEffect(() => {
   axios.get('http://localhost:3000/api/v1/product',{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{
     
     var test=data.data;
     productsDataState(test);    
   
 }).catch((err)=>{
     console.log("error msg" ,);
   });

 },[productsData]);

 
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

             </TableRow>
           </TableHead>
           <TableBody style={{ color: "white" }}>
             {productsData.map((row) => (
               <TableRow key={row.product_name} >
                 <TableCell >{row.product_name}</TableCell>
                 <TableCell align="left">{row.number_of_items}</TableCell>
                 <TableCell align="left">{row.price}</TableCell>
                 <TableCell align="left">{row.discount}</TableCell>
                 <TableCell align="left">{row.sold_items}</TableCell>
                 <TableCell align="left">{row.created_by.user_name}</TableCell>
                 <TableCell align="left" className={styles.Details}><Link to={`/dashboardALLProductDetails/${row._id}`} className={styles.link}>Details</Link> </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
 );
};

export default ProductTable;