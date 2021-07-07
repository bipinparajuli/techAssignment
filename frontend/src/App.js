import React from 'react';
import './App.css';
import Signin from './component/user/Signin'
import Signup from './component/user/Signup'
import Home from './component/Home/Home.js'
import DashBoard from './component/Home/Drawer/Drawer'
import CreateApplication from './component/create/CreateApplication'
import UpdateApplication from './component/update/UpdateApplication';
import PrivateRoute from './component/auth/PrivateRoutes'
import Error from './Error';


import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Profile from './component/Profile/Profile';


function App() {
  return (
    <BrowserRouter>
     <ToastContainer />
     <Switch>
        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
<DashBoard>
        <PrivateRoute path="/home" exact component={Home}  />
        <PrivateRoute path="/Profile" exact component={Profile}  />

        {/* <PrivateRoute path="/dashboard" exact component={DashBoard}  /> */}
        <PrivateRoute path="/New Project" exact component={CreateApplication} />
        <PrivateRoute path="/update/:appId" exact component={UpdateApplication}  />
</DashBoard>
        
        
        <Route  component={Error} />
     </Switch>
    </BrowserRouter>
  );
}

export default App;
