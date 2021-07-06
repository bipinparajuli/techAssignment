import React,{useState} from 'react'
import {signin} from "../auth/index"
import {useHistory,Link} from "react-router-dom"
import {toast} from 'react-toastify'
import {Button,TextField} from "@material-ui/core"
import {isAuthenticated,authenticate} from '../auth/index'

const Signin = () => {
   const [state,setstate] = useState(
       {

        email:"",
       password:""
        }
    );

    const [error,seterror] = useState ({
        emailFormat:"",
        passwordFormat:"",
    })
    
    const {emailFormat,passwordFormat} = error;
    
   const history =  useHistory();

   const {email,password} = state;

const SignIn = () =>{

    //validation

// email validation

if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
{
    return seterror({
       emailFormat:"Please check your email format",
       passwordFormat:"",
    })

}

//password validation

//password format
var regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

if(! regx.test(password))
{
    return seterror({
       emailFormat:"",
       passwordFormat:"password format don't match",
    })

}




//navigating to storage    
signin(state).then((data)=>{
  
    console.log(data);
if(data.success)
{
    
authenticate(data,()=>{
    history.push("/home")
}).catch(err=>console.log("Server Error"))
}

else{
    return seterror({
        emailFormat:"",
        passwordFormat:data.messege,
     })
}



})
.catch((err)=>console.log(err))
    
}

    return (
        <div className="home">
            <div className="registration-form">

            <h1 style={{color:"#383CC1"}}>Sign in here</h1>

            {
                emailFormat? (

                <>
                    <span style={{color:"red"}}>
                        {emailFormat}
                    </span>
                    <br/> <br/> 
                </>
                ): ""
                
             }

                 <TextField label="Email" required variant="outlined" type="email"  onChange={e=>setstate({...state,email:e.target.value})} />

            <br/>
            <br/>

            {
                passwordFormat ? (
                <>
                    <span style={{color:"red"}}>
                        {`${passwordFormat}`}
                    </span>
                     <br/> <br/> 
                </>): ""
            }

             <TextField label="Password" required variant="outlined" type="password" onChange={e=>setstate({...state,password:e.target.value})} />

            <br/>
            <br/>

            <Button variant="contained" color="primary" onClick={SignIn}>Signin</Button><br /><br />

            <strong>Don't have <Link to="/">Account ?</Link></strong>
            </div>

        </div>
    )
}

export default Signin