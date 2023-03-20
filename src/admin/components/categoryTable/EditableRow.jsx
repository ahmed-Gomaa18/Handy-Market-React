import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';

const EditableRow = ({handleEditCategoryForm , handleCancelButton ,row}) => {
    return (
       <TableRow >

        <TableCell align="center">
        <input className={` mx-auto ${styles.input}`} type="text" placeholder='Enter category name' name="categoryName" required="required" onChange={handleEditCategoryForm} />
        </TableCell>

        <TableCell align="center">
        <button className={` ${styles.btnSubmit}`} type="submit" >Submit</button>
        <button className={` ${styles.mybtn}`} onClick={handleCancelButton} >Cancel</button>
        </TableCell>

        </TableRow>
    );
};

export default EditableRow;