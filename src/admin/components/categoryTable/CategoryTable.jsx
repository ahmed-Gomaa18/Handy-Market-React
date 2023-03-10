import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';

const CategoryTable = () => {

  const [categoryData, categoryDataState] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  
  const adminId = localStorage.getItem("user-id");

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category', { 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` 
    }}).then((data) => {
      let test = data.data.allCategories;
      categoryDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [categoryData]);

//take value from input
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const newName = event.target.value;
    setAddCategory(newName);
  };

 //function to add new category 
  const handleAddFormSubmit = event =>{
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/category', {"name":addCategory,"user_id":adminId},{ 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` 
    }}).then((res) => {
      console.log("Done created susccesfuly",res)
    }).catch((err) => {
      console.log("error msg", err);
    });
  }

  const onUpdatecategory = () => {
    axios.patch('http://localhost:3000/api/v1/category', {}, { 
      headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } 
    }).then((res) => {
      console.log("Done updated susccesfuly", res)
  
    }).catch((err) => {
      console.log("error msg", err);
    });
  };


  return (
    <>
      <div className='${styles.Table} col-lg-5 col-md-9'>
        
        <div className="row">
          <h2>Add a New Category</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input className="form-control my-2 " type="type" name="category name" value="" placeholder="enter category name.." required="required" onChange={handleAddFormChange}/>
            <button className="btn btn-success my-2  " type="submit" >ADD</button>
          </form>
        </div>

        <div className="p-2">
          <h3>Our Categories</h3>
          <TableContainer className={styles.tableContainer}  >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <hr />
              <TableBody >
                {categoryData.map((row) => (
                  <TableRow key={row._id} >
                    <TableCell align="left">
                    <input className={styles.input} type="text" name="categoryName" value={row.name} onChange={handleAddFormChange} />
                    </TableCell>
                    <TableCell align="left"><button className={`${styles.button} btn btn-sucess`} >Edit</button></TableCell>
                    <TableCell align="left"><button className={`${styles.button} btn btn-sucess`} >Submit</button></TableCell>
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