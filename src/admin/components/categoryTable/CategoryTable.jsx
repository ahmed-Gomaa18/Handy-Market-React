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
 const [categoryName,categoryNameState] = useState();
 useEffect(() => {
   axios.get('http://localhost:3000/api/v1/category',{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{
   console.log(data.data.allCategories);
   var test=data.data.allCategories;
     categoryDataState(test);
    }).catch((err)=>{
     console.log("error msg" ,);
    });

 },[categoryData]);
  
 const onChangecategoryname = e => {
  const { name ,value } = e.target ;
  const newName =value;
  categoryNameState(newName);
 };

 const onUpdatecategory =()=>{

  axios.patch('http://localhost:3000/api/v1/category',{},{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data)=>{

   }).catch((err)=>{
    console.log("error msg" ,);

   });
 };
 return (
 <>
    <div className='{styles.Table} col-lg-5 col-md-9'>
      <div className="mb-2">
        <div className="row">
        <label className="my-2" > Add Category :</label>
          <div className="col-md-8 mb-2">
          
          <input className="form-control " ></input>
          </div>
          <div className="col-md-4 ">
          <button className="btn btn-success my-2 " >ADD</button>
          </div>
          
        </div>
      </div>
      
      <div className="p-2">  
        <h3>Our Categories</h3>
          <TableContainer className={styles.tableContainer}  >

            <Table className="table" >

              <TableHead>

                <TableRow>
                  
                  <TableCell>Name</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
                  
              </TableHead>
              <hr/>
              <TableBody >
                {categoryData.map((row) => (
                  <TableRow key={row.name} >
                    <TableCell align="left">{row.name}</TableCell>
                    {/* <input name="categoryName" value={row.name} onChange={onChangecategoryname} /> */}
                    <TableCell align="left"><button className="btn btn-sucess" onClick={onUpdatecategory}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
     </div>


     </>  
 );
};

export default CategoryTable;