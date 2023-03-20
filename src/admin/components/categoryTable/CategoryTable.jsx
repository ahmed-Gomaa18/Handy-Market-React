import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const CategoryTable = () => {

  const [categoryData, categoryDataState] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [editCategoryForm, seteditCategoryForm] = useState("");
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

  //function to handle  Edit button
  const handleEditClick = (event, row)=>{
    event.preventDefault();
    setEditCategoryId(row._id); 

  }
  //function to handle take value from Edit category input
  const handleEditCategoryForm = (event) =>{
    event.preventDefault();
    const newName = event.target.value;
    seteditCategoryForm(newName);
  }
  //function to update value of category name in database

  const handleFormUpdatecategory = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3000/api/v1/category/${editCategoryId}`, {"name":editCategoryForm}, { 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } 
    }).then((res) => {
      console.log("Done updated susccesfuly", res)
  
    }).catch((err) => {
      console.log("error msg", err);
    });
     setEditCategoryId(null);
  };
  //function handle cancel button
  const handleCancelButton = () =>{
    setEditCategoryId(null);
  }


  return (
    <>
      <div className={` col-lg-9 col-md-9`}>
        
        <div className="row">
          <h2>Add a New Category</h2>
          <form className="d-flex align-items-center" onSubmit={handleAddFormSubmit}>
            <input className="form-control my-2 me-3" type="type" name="category name" value={addCategory} placeholder="enter category name in english.." required="required" onChange={handleAddFormChange}/>
            <input className="form-control my-2 me-3" type="type" name="category name" value={addCategory} placeholder="enter category name in arabic.." required="required" onChange={handleAddFormChange}/>
            <button className={` my-2 ${styles.mybtn}`}  type="submit" >ADD</button>
          </form>
        </div>

        <div className={` p-2 ${styles.Table}`}>
          <h3>Our Categories</h3>
           <form onSubmit={handleFormUpdatecategory}>
            <TableContainer className={`${styles.tableContainer} `} >
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold" align="center">Name</TableCell>
                    <TableCell className="fw-bold" align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <hr />
                <TableBody >
                  {categoryData.map((row) => (
                    <Fragment key={row._id}>
                      {editCategoryId === row._id ?
                      (<EditableRow row={row} handleEditCategoryForm={handleEditCategoryForm} handleCancelButton = {handleCancelButton}/>)
                      :
                      (<ReadOnlyRow  row={row} handleEditClick={handleEditClick}/>)
                      }
                    </Fragment>
                      
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </form>
        </div>

        
      </div>
    </>
  );
};

export default CategoryTable;