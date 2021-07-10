import React,{useState,useEffect} from 'react'
import Navbar from './Navbar/Navbar'
import BasicTable from './Table/BasicTable'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';



import './Home.css'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Drawer from '../Home/Drawer/Drawer'
import {useStateValue} from '../context/ServiceProvider'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const Home = () => {
    const [{delet,snack},dispatch] = useStateValue();
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { open } = state;
    
    
      const handleClose = () => {
        setState({ ...state, open: false });
        dispatch({
            type:"SNACK",
            item:false
        })
      };
      useEffect(()=>{
        setState({ open: snack});

      },[])
    return (
<>
<Typography variant="h3">
          ALL APPLICATIONS
        </Typography>

        <BasicTable />
        <Snackbar
        color="primary"
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        message="Successfully loggedin"
      >
 <Alert onClose={handleClose} severity="info">
    Successfully logged in
  </Alert>
          </Snackbar>

          <Snackbar
        color="primary"
        autoHideDuration={6000}
        open={delet}
        onClose={handleClose}
        // message="Successfully loggedin"
      >
 <Alert onClose={handleClose} severity="info">
    Successfully deleted the project
  </Alert>
          </Snackbar>
</>

  
    )
}

export default Home
