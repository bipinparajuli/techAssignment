import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {getProducts,deletProduct,Image} from '../../helper/apihelper'
import {useStateValue} from '../../context/ServiceProvider'
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../auth';
import GetAppIcon from '@material-ui/icons/GetApp';

const {data} = isAuthenticated()

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width:"90%"
  },
});


export default function UpdateTable({data}) {
const[{search},dispatch]=  useStateValue();
  const [rows, setrows] = useState([])
  const classes = useStyles();

  const preload = () => {
    console.log(data);
   setrows(data)
  
  }



useEffect(()=>{
  preload();
},[])

useEffect(()=>{

  if(search.length > 0)
  {
  setrows(search)
  }
  else{
preload();
  }
},[search])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>VERSION</TableCell>
            <TableCell align="right">UPLOADED ON</TableCell>
            <TableCell align="right">UNIQUE ID</TableCell>
            <TableCell align="right">DOWNLOAD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows== undefined?<h3>Could not found App in server </h3> :rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
              {row.releasename}
              </TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell align="right">{row._id}</TableCell>
              <TableCell align="right"><GetAppIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

