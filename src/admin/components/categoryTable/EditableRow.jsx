import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';

const EditableRow = ({handleEditCategoryForm , handleCancelButton ,row}) => {
    return (
       <TableRow >

        <TableCell align="left">
        <input className={styles.input} type="text" placeholder='Enter category name' name="categoryName" required="required" onChange={handleEditCategoryForm} />
        </TableCell>

        <TableCell align="left">
        <button className={`${styles.button} btn btn-sucess`} type="submit" >Submit</button>
        <button className={`${styles.button} btn btn-sucess`} onClick={handleCancelButton} >Cancel</button>
        </TableCell>

        </TableRow>
    );
};

export default EditableRow;