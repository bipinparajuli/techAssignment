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
// import AndroidIcon from '@material-ui/icons/Android';
import AndroidIcon from '@material-ui/icons/AndroidOutlined';
import { green } from '@material-ui/core/colors';
const {data} = isAuthenticated()

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width:"90%"
  },
});


export default function BasicTable() {
const[{search},dispatch]=  useStateValue();
  const [rows, setrows] = useState([])
  const classes = useStyles();

  const preload = () => {
    getProducts().then(data=>{
      console.log(data);
      setrows(data)
    }).catch(err=>console.log(err))
    
  }

  const deleteHandler = (rowid) => {
    deletProduct(data.token,data.id,rowid).then((data)=>{
    toast(data,{type:"success"})
      preload();
    })
    
                .catch(err=>toast("Failed to delete",{type:"error"}))
                
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
            <TableCell>APP NAME</TableCell>
            <TableCell>PRICE</TableCell>  
            <TableCell align="right">LATEST VERSION</TableCell>
            <TableCell align="right">CREATED</TableCell>
            <TableCell align="right">TOTAL VERSIONS</TableCell>
            <TableCell align="right">PACKAGE URL</TableCell>
            <TableCell align="right">STATUS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows== undefined?<h3>Could not found App in server </h3> :rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
               <Link style={{color:"#000"}} to={`update/${row._id}`}><AndroidIcon  style={{ color: green[500] }} /> {row.title}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                Free
              </TableCell>
              <TableCell align="right">{row.releasename}</TableCell>
              <TableCell align="right">{row.createdAt.substr(0,10)}</TableCell>
              <TableCell align="right">{row.nofoversion}</TableCell>
              <TableCell align="right">
                {row.packageurl}              
              </TableCell>
              <TableCell align="right">
                Published
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

