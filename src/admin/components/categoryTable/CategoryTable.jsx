import React,{useState ,useEffect,} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import axios from 'axios';

import styles from './CategoryTable.module.css'


const CategoryTable = () => {
    
    localStorage.setItem("userToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODE0NDMxMSwiZXhwIjoxNjc4NzQ5MTExfQ.CqnoJteMEIVQVwcj3PJoDF--z_RyDvP5llRH9EykpX4");
 const [categoryData,categoryDataState] = useState([]);

 useEffect(() => {
   axios.get('http://localhost:3000/api/v1/category',{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{
     
     var test=data.data;
     categoryDataState(test);
    }).catch((err)=>{
     console.log("error msg" ,);
    });

 },[categoryData]);

 
 return (

     <div className='{styles.Table} col-lg-10 col-md-9'>
      <label> Add Category :</label>
      <input></input>
      <button>ADD</button>
      
     <h3>Our Categories</h3>
       <TableContainer className={styles.tableContainer}  >

         <Table >

           <TableHead>

             <TableRow>
 
               <TableCell>Name</TableCell>
               

             </TableRow>
           </TableHead>
           <TableBody >
             {categoryData.map((row) => (
               <TableRow key={row.total_profit} >
                <TableCell align="left">{row.name}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
 );
};

export default CategoryTable;