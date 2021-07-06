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
            <TableCell>App Name</TableCell>
            <TableCell align="right">Release Name</TableCell>
            <TableCell align="right">Last Update</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows== undefined?<h3>Could not found App in server </h3> :rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <div className="app_name">
                  <div className="icons">
                     
 {Image(row._id)}

                  </div>
                  <div className="content">
                    <h4>
                      {row.title}
                    </h4>
                    <p>{row.description}</p>
                  </div>
 
                </div>

              </TableCell>
              <TableCell align="right">{row.releasename}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell align="right"><strong>Published</strong></TableCell>
              <TableCell align="right">
               <Button variant="outlined" color="primary">
                 <Link to={`/update/${row._id}`}>
                  Update
                 </Link>
                </Button>
            </TableCell>
              <TableCell align="right">
              <Button variant="outlined" color="secondary" onClick={()=> deleteHandler(row._id)} >
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

