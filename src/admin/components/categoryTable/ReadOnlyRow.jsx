import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from './CategoryTable.module.css';
const ReadOnlyRow = ({row ,handleEditClick}) => {
    return (
       <TableRow key={row._id} >
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left"><button className={`btn btn-sucess ${styles.button} `} onClick={(event)=>handleEditClick(event,row)}>Edit</button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;