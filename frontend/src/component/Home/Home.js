import React from 'react'
import Navbar from './Navbar/Navbar'
import BasicTable from './Table/BasicTable'
import './Home.css'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
const Home = () => {
    
    return (
        <div className="home-page">
    
            <Navbar />


           
<div className="home-container">
            
            <Button variant="contained" color="primary">
                <Link to="/createapplication">
                Create Application
                </Link> 
            </Button>

            <BasicTable />
</div>

        </div>
    )
}

export default Home
