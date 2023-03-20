import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';
const ReadOnlyRow = ({row ,handleEditClick}) => {
    return (
       <TableRow key={row._id} >

            <TableCell align="center">{row.name_en} <br /> {row.name_ar}</TableCell>
            
            <TableCell align="center"><button className={`${styles.btnEdit} `} onClick={(event)=>handleEditClick(event,row)}>Edit</button></TableCell>

        </TableRow>
    );
};

export default ReadOnlyRow;