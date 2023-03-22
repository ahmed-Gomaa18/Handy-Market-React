import React, { useRef, useState, useEffect, Fragment } from "react";
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

import { ToastContainer, toast } from 'react-toastify';

const CategoryTable = () => {

  let formRef = useRef(null);

  const [categoryData, categoryDataState] = useState([]);
  const [addCategoryEn, setAddCategoryEn] = useState("");
  const [addCategoryAr, setAddCategoryAr] = useState("");
  
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [editCategoryFormEn, seteditCategoryFormEn] = useState("");
  const [editCategoryFormAr, seteditCategoryFormAr] = useState("");
  const adminId = localStorage.getItem("user-id");

  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/category', { 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` 
    }}).then((data) => {
      let test = data.data.allCategories;
      categoryDataState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [categoryData]); //categoryData



  
//take value from input
  const handleAddFormChange = (event) => {
    const {name, value} = event.target;
    if(name == 'category_name_en'){
      setAddCategoryEn(value)
    }else if(name == 'category_name_ar'){
      setAddCategoryAr(value)
    }

  };

 //function to add new category 
  const handleAddFormSubmit = event =>{
    event.preventDefault();
    axios.post('https://handy-market-api.onrender.com/api/v1/category', {"name_en":addCategoryEn,"name_ar":addCategoryAr ,"user_id":adminId},{ 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` 
    }}).then((res) => {
      // Show Success
      toast.success("Done created susccesfuly", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      // reset form
      formRef.current.reset();

    }).catch((err) => {
      console.log("error msg", err);
      
      // Show Error
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

    });
  }



  //function to handle  Edit button
  const handleEditClick = (event, row)=>{
    event.preventDefault();
    setEditCategoryId(row._id); 

  }



  //function to handle take value from Edit category input
  const handleEditCategoryForm = (event) =>{
    const {name, value} = event.target;
    if (name === 'categoryNameEn'){
      seteditCategoryFormEn(value)
    }else if(name === 'categoryNameAr'){
      seteditCategoryFormAr(value)
    }
  }



  //function to update value of category name in database
  const handleFormUpdatecategory = (event) => {
    event.preventDefault();

    axios.patch(`https://handy-market-api.onrender.com/api/v1/category/${editCategoryId}`, {"name_en":editCategoryFormEn, "name_ar": editCategoryFormAr}, { 
      headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } 
    }).then((res) => {
      // Show Success
      toast.success("Done Updated susccesfuly", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
  
    }).catch((err) => {
      console.log("error msg", err);

      // Show Error
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

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
          <form className="d-flex align-items-center" ref={formRef} onSubmit={handleAddFormSubmit}>
            <input className="form-control my-2 me-3" type="type" name="category_name_en" placeholder="Enter category name.." required="required" onChange={handleAddFormChange}/>
            
            <input className="form-control my-2 me-3" type="type" name="category_name_ar" placeholder="..أدخل أسم الصنف" required="required" onChange={handleAddFormChange}/>

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
                      (<EditableRow row={row} handleEditCategoryForm={handleEditCategoryForm} handleCancelButton = {handleCancelButton} />)
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
      <ToastContainer />
    </>
  );
};

export default CategoryTable;