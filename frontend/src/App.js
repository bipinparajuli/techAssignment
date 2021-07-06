import React from 'react';
import './App.css';
import Signin from './component/user/Signin'
import Signup from './component/user/Signup'
import Home from './component/Home/Home.js'
import CreateApplication from './component/create/CreateApplication'
import UpdateApplication from './component/update/UpdateApplication';
import PrivateRoute from './component/auth/PrivateRoutes'
import Error from './Error';

import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
     <ToastContainer />
     <Switch>
        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/createapplication" exact component={CreateApplication} />

        <PrivateRoute path="/home" exact component={Home}  />
        <PrivateRoute path="/update/:appId" exact component={UpdateApplication}  />

        
        <Route  component={Error} />
     </Switch>
    </BrowserRouter>
  );
}

export default App;
