import React from 'react'
import Navbar from './Navbar/Navbar'
import BasicTable from './Table/BasicTable'
import Typography from '@material-ui/core/Typography';
import './Home.css'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Drawer from '../Home/Drawer/Drawer'


const Home = () => {
    
    return (
<>
<Typography variant="h3">
          ALL APPLICATIONS
        </Typography>

        <BasicTable />
</>

  
    )
}

export default Home
