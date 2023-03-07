import React,{useState ,useEffect,} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import axios from 'axios';

import styles from './userTable.module.css'

const UsersTable = () => {
  
  const[block ,blockState] = useState();
  
  localStorage.setItem("userToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODEyMjkzNSwiZXhwIjoxNjc4NzI3NzM1fQ.jfpDX5A8JkOVYXzCeiYYK-MVHGFavTDmB9xoyMWh-tk");
  const [usersData,usersDataState] = useState([]);

 useEffect(() => {
   axios.get('http://localhost:3000/api/v1/admin/allUsers',{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{

     var test=data.data;
     usersDataState(test); 
   
 }).catch((err)=>{
     console.log("error msg" ,);
   });

 },[usersData,block]);




 const BlockUser = (param)=>{
   
  
   axios.patch(`http://localhost:3000/api/v1/admin/user/block/${block}/${param}`,{},{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((res)=>{

     console.log("sucess",res)
  }).catch((err)=>{
     console.log("error msg" ,err);
  });
 }
 
 return (

     <div className='{styles.Table } col-lg-10 col-md-9'>
     <h3>All Users</h3>
       <TableContainer className={styles.tableContainer} >

         <Table  >

           <TableHead>

             <TableRow>
 
               <TableCell>User Name</TableCell>
               <TableCell align="left">Email</TableCell>
               <TableCell align="left">Phone</TableCell>
               <TableCell align="left">Role</TableCell>
               <TableCell align="left">Active</TableCell>
               <TableCell align="left">Block</TableCell>

             </TableRow>
           </TableHead>

           <TableBody >

             {usersData.map((row) => (
               <TableRow key={row.product_name} >
                  <TableCell > {row.user_name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{row.active?"True":"False"}</TableCell>
                  <TableCell align="left">
                  <button className={styles.status}  
                   onClick={()=>{
                      if(row.isBlocked){
                      blockState("false")
                      }else{
                      blockState("true")
                      };
                    BlockUser(row._id)}}>{row.isBlocked===true?"UnBlock":"Block"}
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