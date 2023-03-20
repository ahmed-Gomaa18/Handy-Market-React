import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';

const EditableRow = ({handleEditCategoryForm , handleCancelButton ,row}) => {

    return (
       <TableRow >
        
        <TableCell align="left">
        <input className={styles.input} type="text" placeholder={row.name_en} name="categoryNameEn" required="required" onChange={handleEditCategoryForm} />
        <input className={styles.input} type="text" placeholder={row.name_ar} name="categoryNameAr" required="required" onChange={handleEditCategoryForm} />
        </TableCell>

        <TableCell align="left">
        <button className={`${styles.mybtn}`} type="submit" >Submit</button>
        <button className={`${styles.mybtn}`} onClick={handleCancelButton} >Cancel</button>
        </TableCell>

        </TableRow>
    );
};

export default EditableRow;